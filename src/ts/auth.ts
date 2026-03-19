// ===== AUTH MODULE — DaSIboard =====
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './firebase-config';

const ERROR_MESSAGES: Record<string,string> = {
  'auth/weak-password': 'Senha fraca. Use pelo menos 6 caracteres.',
  'auth/email-already-in-use': 'Este email já está registrado.',
  'auth/invalid-email': 'Email inválido.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/invalid-credential': 'Email ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  'auth/operation-not-allowed': 'Login por email/senha não está ativo. Ative no Firebase Console.',
  'auth/network-request-failed': 'Erro de rede. Verifique sua conexão.',
  'auth/requires-recent-login': 'Faça login novamente para continuar.',
};

function getErrMsg(code: string): string { return ERROR_MESSAGES[code] ?? `Erro (${code}). Tente novamente.`; }

class AuthManager {
  currentUser: User | null = null;
  initialized = false;

  init(): Promise<User | null> {
    return new Promise(resolve => {
      onAuthStateChanged(auth, user => {
        this.currentUser = user;
        this.initialized = true;
        this.updateAuthUI();
        resolve(user);
      });
    });
  }

  getUser() { return this.currentUser; }
  isAuthenticated() { return !!this.currentUser; }

  async login(email: string, password: string) {
    try {
      const r = await signInWithEmailAndPassword(auth, email, password);
      this.currentUser = r.user;
      await this.loadUserProfile();
      this.updateAuthUI();
      return { success: true, user: r.user };
    } catch(e: any) { return { success: false, error: getErrMsg(e.code) }; }
  }

  async signup(email: string, password: string, displayName: string) {
    try {
      const r = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(r.user, { displayName, photoURL: null });
      try {
        await setDoc(doc(db, 'users', r.user.uid), {
          email, displayName, photoURL: null,
          createdAt: serverTimestamp(), bio: '', universidade: 'USP', curso: 'Sistemas de Informação',
        });
      } catch(fsErr) { console.warn('Firestore write failed:', fsErr); }
      this.currentUser = r.user;
      this.updateAuthUI();
      return { success: true, user: r.user };
    } catch(e: any) { return { success: false, error: getErrMsg(e.code) }; }
  }

  async logout() {
    try { await signOut(auth); this.currentUser = null; this.updateAuthUI(); return { success: true }; }
    catch(e: any) { return { success: false, error: e.message }; }
  }

  async loadUserProfile() {
    if (!this.currentUser) return null;
    try { const s = await getDoc(doc(db,'users',this.currentUser.uid)); return s.exists() ? s.data() : null; }
    catch { return null; }
  }

  async updateUserProfile(data: { displayName?:string; photoURL?:string; bio?:string; curso?:string }) {
    if (!this.currentUser) return { success: false, error: 'Não autenticado' };
    try {
      if (data.displayName) await updateProfile(this.currentUser, { displayName: data.displayName, photoURL: data.photoURL ?? this.currentUser.photoURL });
      try { await updateDoc(doc(db,'users',this.currentUser.uid), { displayName: data.displayName ?? this.currentUser.displayName, photoURL: data.photoURL ?? this.currentUser.photoURL, bio: data.bio ?? '', curso: data.curso ?? 'Sistemas de Informação' }); }
      catch(fsErr) { console.warn('Firestore update failed:', fsErr); }
      await this.currentUser.reload();
      this.updateAuthUI();
      return { success: true };
    } catch(e: any) { return { success: false, error: e.message }; }
  }

  async uploadProfilePhoto(file: File) {
    if (!this.currentUser) return { success: false, error: 'Não autenticado' };
    try {
      const r = ref(storage, `profiles/${this.currentUser.uid}/avatar`);
      await uploadBytes(r, file);
      const photoURL = await getDownloadURL(r);
      await updateProfile(this.currentUser, { photoURL });
      await this.updateUserProfile({ photoURL });
      return { success: true, photoURL };
    } catch(e: any) { return { success: false, error: e.message }; }
  }

  updateAuthUI() {
    const authenticated = this.isAuthenticated();
    const user = this.currentUser;
    const updateBtn = (btnId: string, iconId: string) => {
      const btn = document.getElementById(btnId), icon = document.getElementById(iconId);
      if (!btn || !icon) return;
      if (authenticated && user) {
        btn.dataset.state = 'authenticated';
        const initial = user.displayName?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? '?';
        icon.innerHTML = initial; icon.style.fontSize = '16px'; icon.style.fontWeight = '700'; icon.style.color = 'inherit';
        btn.title = user.displayName ?? user.email ?? 'Meu perfil';
      } else {
        btn.dataset.state = 'guest';
        icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" opacity="0.8"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>';
        icon.style.fontSize = ''; icon.style.fontWeight = ''; btn.title = 'Fazer login';
      }
    };
    updateBtn('profile-btn','profile-icon');
    updateBtn('sidebar-header-profile-btn','sidebar-header-profile-icon');
    this._renderProfileMenus(authenticated, user);
  }

  private _renderProfileMenus(authenticated: boolean, user: User | null) {
    ['profile-menu-box-sidebar','profile-menu-box-topbar'].forEach(id => {
      const box = document.getElementById(id); if (!box) return; box.innerHTML = '';
      if (authenticated && user) {
        const h = document.createElement('div');
        h.style.cssText = 'padding:10px 14px;border-bottom:1px solid var(--glass-border);margin-bottom:4px';
        h.innerHTML = `<div style="font-size:13px;font-weight:600;color:var(--text)">${user.displayName ?? 'Usuário'}</div><div style="font-size:11px;color:var(--text-muted)">${user.email ?? ''}</div>`;
        box.appendChild(h);
        const pLink = document.createElement('a'); pLink.href='profile.html'; pLink.className='profile-menu-item profile-menu-profile';
        pLink.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Ver perfil</span>';
        box.appendChild(pLink);
        const logoutBtn = document.createElement('button'); logoutBtn.className='profile-menu-item profile-menu-logout';
        logoutBtn.onclick = () => { (window as any).closeProfileMenu?.('both'); (window as any).confirmLogout?.(); };
        logoutBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>Encerrar sessão</span>';
        box.appendChild(logoutBtn);
      } else {
        const lb = document.createElement('button'); lb.className='profile-menu-item'; lb.style.cssText='font-weight:600;color:var(--primary)';
        lb.onclick = () => { (window as any).closeProfileMenu?.('both'); window.location.href='login.html'; };
        lb.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg><span>Iniciar sessão</span>';
        box.appendChild(lb);
      }
    });
  }
}

export const authManager = new AuthManager();
(window as any).authManager = authManager;

document.addEventListener('DOMContentLoaded', () => {
  authManager.init().then(user => {
    if (['profile.html','dashboard.html'].some(p => window.location.pathname.includes(p)) && !user)
      window.location.href = 'login.html';
  });
});

function closeProfileMenu(origin: string = 'both') {
  if (origin==='sidebar'||origin==='both') document.getElementById('profile-menu-sidebar')?.classList.add('hidden');
  if (origin==='topbar' ||origin==='both') document.getElementById('profile-menu-topbar')?.classList.add('hidden');
}
function confirmLogout() { document.getElementById('logout-confirm-modal')?.classList.remove('hidden'); }
function closeLogoutModal() { document.getElementById('logout-confirm-modal')?.classList.add('hidden'); }
function doLogout() { closeLogoutModal(); authManager.logout().then(r => { if (r.success) window.location.href='index.html'; }); }

(window as any).closeProfileMenu = closeProfileMenu;
(window as any).confirmLogout   = confirmLogout;
(window as any).closeLogoutModal= closeLogoutModal;
(window as any).doLogout        = doLogout;
