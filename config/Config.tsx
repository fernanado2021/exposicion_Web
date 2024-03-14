import { initializeApp } from "firebase/app";
import 'firebase/database';
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBiZxM3wIkUPLl7WmdLUfwD84UH7awL5yQ",
    authDomain: "sistema-faad3.firebaseapp.com",
    projectId: "sistema-faad3",
    storageBucket: "sistema-faad3.appspot.com",
    messagingSenderId: "249066659246",
    appId: "1:249066659246:web:165c140db345c96fd57c3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getDatabase(app)
export const storage = getStorage(app)