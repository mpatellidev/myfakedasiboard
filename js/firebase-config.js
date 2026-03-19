// ===== FIREBASE CONFIGURATION =====
// Substitua com suas credenciais do Firebase Console
// https://console.firebase.google.com/

const firebaseConfig = {
  apiKey: "AIzaSyDOy0T5Yc5hyoLPzJ5az7DBG9oiF1Ng2xQ",
  authDomain: "dasiboard-db.firebaseapp.com",
  projectId: "dasiboard-db",
  storageBucket: "dasiboard-db.firebasestorage.app",
  messagingSenderId: "645371345193",
  appId: "1:645371345193:web:d7607767015098c82a1f38",
  measurementId: "G-F2ZRXCV0F2"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Configurar persistência
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch(err => console.error('Persistência não configurada:', err));
