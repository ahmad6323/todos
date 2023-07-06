
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDeRZMzawQVCB1fo1C4R4fkUK9IpnqnNLY",
    authDomain: "todo-app-95d75.firebaseapp.com",
    projectId: "todo-app-95d75",
    storageBucket: "todo-app-95d75.appspot.com",
    messagingSenderId: "495922346971",
    appId: "1:495922346971:web:1b152fdd4e0f0e259245fe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {
    db
}