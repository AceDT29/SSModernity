import { writable, get } from "svelte/store"
import { getCurrentUser } from "../firebase/firebaseConfig"
import { productPkg } from "./ProductStore";
import { fireDb, dbSet, dbRef } from "../firebase/firebaseConfig";
import { userExists } from "../Utilities/dbQuery";

class SSUser {
  constructor({ uid, displayName, email, photoURL }) {
    this.uid = uid;
    this.displayName = displayName || "";
    this.email = email || "";
    this.photoURL = photoURL || "";
    this.wishlist = null;
    this.coverUrl = null;
  }
}

const createUser = () => {
const { subscribe, set } = writable({});
    return {
        subscribe,
        addUser: async (firebaseUser) => {
            if (!firebaseUser) {
                set(null);
            } else {
                const { uid, displayName, email, photoURL } = firebaseUser;
                const user = new SSUser({
                    uid,
                    displayName,
                    email,
                    photoURL
                }); 
                user.wishlist = get(productPkg);
                const userQueryExists = await userExists(uid);
                if (userQueryExists === false) {
                    await dbSet(dbRef(fireDb, `users/${user.uid}`), user);
                }
                set(user);
            }
        },
        currentUser: async () => {
            const userResponse = await getCurrentUser()
            if (!userResponse) {
                set(null);
            } else {
                const {uid, displayName, email, photoURL} = userResponse;
                const user = new SSUser({
                    uid,
                    displayName,
                    email,
                    photoURL
                });
                user.wishlist = get(productPkg);
                set(user);
            }
        },
        
    }
}

export const User = createUser()