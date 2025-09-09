import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase, ref, set, onValue, get } from "firebase/database"
import { GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APY_KEY,
    authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig)

const auth = getAuth()
const fireDb = getDatabase()
const provider = new GoogleAuthProvider()

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            resolve(user)
        }, reject)
    })
}

export { auth, provider, getCurrentUser, fireDb, set as dbSet, ref as dbRef, onValue as dbOnValue, get as dbGet }

