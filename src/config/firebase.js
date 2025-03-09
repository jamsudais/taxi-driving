import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmyZSDwqOcyKlxc79F5nhWKR4rYOPBSc4",
    authDomain: "react-native-with-db.firebaseapp.com",
    projectId: "react-native-with-db",
    storageBucket: "react-native-with-db.appspot.com",
    messagingSenderId: "712561930588",
    appId: "1:712561930588:web:71b93f12be4c928beb9199"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const storage = getStorage(app);