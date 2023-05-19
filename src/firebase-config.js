import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsPYuLm1vgGE5uyWl7jPu7TKA5ln8p424",
    authDomain: "ptg3-hrv.firebaseapp.com",
    projectId: "ptg3-hrv",
    storageBucket: "ptg3-hrv.appspot.com",
    messagingSenderId: "901670802922",
    appId: "1:901670802922:web:7457fd6b068b8012c2ce93"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)