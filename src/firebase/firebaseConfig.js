import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBbVQAg6xQ4x2wG4DKFgY5kLtDvdNtPWSE",
    authDomain: "ssmodernity-c421a.firebaseapp.com",
    projectId: "ssmodernity-c421a",
    storageBucket: "ssmodernity-c421a.firebasestorage.app",
    messagingSenderId: "1038604237794",
    appId: "1:1038604237794:web:70906b46e89e07a0dc57bb"
}

initializeApp(firebaseConfig)

const auth = getAuth()
const provider = new GoogleAuthProvider()

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            resolve(user)
        }, reject)
    })
}

export { auth, provider, getCurrentUser}

