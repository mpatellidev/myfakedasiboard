# 🔐 Configuração do Firebase — DaSIboard

## Como Configurar a Autenticação

Seu sistema de autenticação está pronto! Agora você precisa configurar as credenciais do Firebase para fazer tudo funcionar.

### 1️⃣ Crie um Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Criar Projeto"** (ou use um projeto existente)
3. Nomeie como `dasiboard` (ou outro nome)
4. Siga os passos de criação

### 2️⃣ Obtenha suas Credenciais

1. No Firebase Console, clique em **⚙️ Configuração do Projeto** (canto superior direito)
2. Acesse a aba **"Seu aplicativo"** ou **"Aplicativos"**
3. Clique em **"Adicionar app"** → **Web** (símbolo `</>`)
4. Dê um nome: `DaSIboard Web`
5. Copy o bloco de código que aparece com suas credenciais

Você receberá algo assim:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD_...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

### 3️⃣ Configure no Projeto

Abra o arquivo `js/firebase-config.js` e substitua o bloco `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "SUAS_CREDENCIAIS_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef1234567890"
};
```

### 4️⃣ Ative a Autenticação por Email

1. No Firebase Console, acesse **Autenticação** (menu esquerdo)
2. Clique em **"Primeiros passos"** ou **"Provedores"**
3. Clique em **Email/Senha**
4. Habilite **"Email/Senha"** e **"Link de email (sem senha)"** (opcional)
5. Clique **Salvar**

### 5️⃣ Configure o Firestore (para perfis dos usuários)

1. No Firebase Console, vá em **Firestore Database** (menu esquerdo)
2. Clique em **"Criar banco de dados"**
3. Escolha modo **"Iniciar no modo de teste"** (desenvolvimento)
4. Selecione região: **Preferência de latência** (próximo a você)
5. Clique **Criar**

**Regras de segurança** (importante para desenvolvimento):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

### 6️⃣ Configure o Cloud Storage (para fotos de perfil)

1. No Firebase Console, vá em **Storage** (menu esquerdo)
2. Clique em **"Começar"**
3. Modo: **"Iniciar no modo de teste"**
4. Região: **Preferência de latência**
5. Clique **Criar**

**Regras de segurança** (para desenvolvimento):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profiles/{uid}/{allPaths=**} {
      allow read;
      allow write: if request.auth.uid == uid && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

---

## 📋 Estrutura do Sistema

```
📁 Sistema de Autenticação
├── 📄 login.html          → Tela de login
├── 📄 signup.html         → Tela de cadastro
├── 📄 profile.html        → Perfil do usuário
├── 📄 js/firebase-config.js  → Configuração do Firebase
├── 📄 js/auth.js          → Lógica de autenticação
└── 📄 js/app.js           → Funções de menu (atualizado)
```

---

## 🎯 Funcionalidades Implementadas

✅ **Autenticação**
- Login com email/senha
- Cadastro de novos usuários
- Logout com confirmação

✅ **Perfil do Usuário**
- Upload de foto de perfil
- Editar informações pessoais
- Armazenamento em Firestore

✅ **Interface**
- Botão de perfil no canto superior direito
- Menu dropdown ao clicar
- Estilos integrados ao design existente

---

## 🧪 Testando Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/dasiboard.git

# Abra no navegador
# index.html → clique no botão de perfil (canto superior direito)
```

**⚠️ Nota:** O projeto é servido como estático no GitHub Pages, então funciona 100% no navegador.

---

## 🔒 Segurança

- ✅ Chaves do Firebase são públicas (seguro expô-las no GitHub)
- ✅ Senhas são hasheadas pelo Firebase
- ✅ Dados armazenados com controle de acesso por UID
- ✅ Fotos limitadas a 5MB para performance

> **Nunca commit senhas ou tokens privados!**

---

## ❓ Troubleshooting

### "Firebase não está definido"
Certifique-se de que os scripts do Firebase estão carregando. Abra DevTools (F12) → Console
```javascript
typeof firebase
```
Deve retornar `"object"`, não `"undefined"`.

### "CORS error ao fazer upload"
Verifique se as **Regras de Segurança do Storage** estão corretas (veja seção 6).

### "Firestore não permite leitura"
Verifique se as **Regras do Firestore** estão ativas (seção 5).

---

## 📞 Suporte

Qualquer dúvida sobre Firebase, consulte:
- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase Auth Reference](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Cloud Storage](https://firebase.google.com/docs/storage)

---

**Pronto!** Após configurar, abra `index.html`, clique no perfil (canto superior direito) e comece a usar! 🚀
