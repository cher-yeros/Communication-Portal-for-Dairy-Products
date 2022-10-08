import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA70zzf8MxAX2XhcqAD_CE1aYBaX6OlvWk",
  authDomain: "cdpd-dcd0a.firebaseapp.com",
  projectId: "cdpd-dcd0a",
  storageBucket: "cdpd-dcd0a.appspot.com",
  messagingSenderId: "51765842165",
  appId: "1:51765842165:web:3a4ea175d8c71f81d4f5bc",
  measurementId: "G-FCJ03F4XG6",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { db };
