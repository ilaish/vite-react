import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnSTJ-2L8lZU_OE6hRiyDMsCrx8NpAL34",
  authDomain: "supermarket-list-app-a3dd8.firebaseapp.com",
  projectId: "supermarket-list-app-a3dd8",
  storageBucket: "supermarket-list-app-a3dd8.firebasestorage.app",
  messagingSenderId: "856137331828",
  appId: "1:856137331828:web:f9b93f9d590b6bdbdacd21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;