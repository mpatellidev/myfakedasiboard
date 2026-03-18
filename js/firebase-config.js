// ===== FIREBASE CONFIGURATION =====
// Substitua com suas credenciais do Firebase Console
// https://console.firebase.google.com/

const firebaseConfig = {
  apiKey: "AIzaSyD_YOUR_API_KEY_HERE",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Configurar persistência
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch(err => console.error('Persistência não configurada:', err));
