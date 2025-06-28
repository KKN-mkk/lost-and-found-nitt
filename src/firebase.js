import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgrNlqZgN-YRFinjty17MoYRiGsMQj08M",
  authDomain: "lost-and-found-nitt.firebaseapp.com",
  projectId: "lost-and-found-nitt",
  storageBucket: "lost-and-found-nitt.appspot.com",
  messagingSenderId: "192527226353",
  appId: "1:192527226353:web:8284625ba7fe1500c4a050"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
