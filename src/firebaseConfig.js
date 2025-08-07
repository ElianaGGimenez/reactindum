import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAtdh_aL10JeH0nOg6tSqWeYL38Ian9jnQ",
  authDomain: "se-indumentaria-y-accesorios.firebaseapp.com",
  projectId: "se-indumentaria-y-accesorios",
  storageBucket: "se-indumentaria-y-accesorios.firebasestorage.app",
  messagingSenderId: "747641300077",
  appId: "1:747641300077:web:bf944e5b4b7cdf8b768b64",
  measurementId: "G-1HFQRBT9QW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db }; 
