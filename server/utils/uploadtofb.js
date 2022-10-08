const {initializeApp} = require('firebase/app');
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDE79rXutmF44enUt061nK6OZnL6P2tQeg",
  authDomain: "cpdp-12731.firebaseapp.com",
  projectId: "cpdp-12731",
  storageBucket: "cpdp-12731.appspot.com",
  messagingSenderId: "83482247473",
  appId: "1:83482247473:web:603a8b2400d535a8a07010"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

module.exports = storage

