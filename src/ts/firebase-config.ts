// ===== FIREBASE CONFIG — DaSIboard =====
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey:            'AIzaSyDOy0T5Yc5hyoLPzJ5az7DBG9oiF1Ng2xQ',
  authDomain:        'dasiboard-db.firebaseapp.com',
  projectId:         'dasiboard-db',
  storageBucket:     'dasiboard-db.firebasestorage.app',
  messagingSenderId: '645371345193',
  appId:             '1:645371345193:web:d7607767015098c82a1f38',
  measurementId:     'G-F2ZRXCV0F2',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth        = getAuth(firebaseApp);
export const db          = getFirestore(firebaseApp);
export const storage     = getStorage(firebaseApp);

setPersistence(auth, browserLocalPersistence).catch(err =>
  console.error('[Firebase] Persistência não configurada:', err)
);
