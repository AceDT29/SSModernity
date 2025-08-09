import { writable, get } from "svelte/store"
import { getCurrentUser } from "../firebase/firebaseConfig"
import { productPkg } from "./ProductStore";

class SSUser {

    wishlist;
    coverUrl;

  constructor({ uid, displayName, email, photoURL }) {
    this.uid = uid;
    this.displayName = displayName || "";
    this.email = email || "";
    this.photoURL = photoURL || "";
  }
}


const createUser = () => {
const { subscribe, set } = writable({});
    return {
        subscribe,
        addUser: (firebaseUser) => {
            
            if (firebaseUser) {
            const user = new SSUser({
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL
            });
                user.wishlist = get(productPkg);
                set(user);
            } else {
                set(null);
            }
        },
        currentUser: async () => {
            const userResponse = await getCurrentUser()
            set(userResponse)
        }
    }
}

export const User = createUser()