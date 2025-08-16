import { writable } from "svelte/store"
import { User } from "./UserStore"
import { fireDb, dbRef, dbSet} from "../firebase/firebaseConfig";
import { itemExists, updateWishlistOnDb } from "../Utilities/dbQuery"

let userUid = "";

User.subscribe((user) => {
    userUid = user?.uid || "";
}); 

const createProduct = () => {
    const {subscribe, update, set} = writable([])
    return {
        subscribe,
        local: (productPkg) => {
            set(productPkg)
        },
        add: async (prodItem, action) => {
            if (!userUid) return
            const onExists = await itemExists(userUid, prodItem.id);
            if (onExists) return 
            update((productPkg) => {
                if (!Array.isArray(productPkg)) return []
                const prodExists = productPkg.some((item) => item.id === prodItem.id)
                if (!prodExists && productPkg.length < 7) {
                    return [...productPkg, prodItem];
                }
                return productPkg
            })
            updateWishlistOnDb(userUid, prodItem, action);
        },
        addWithoutUser: (prodItem) => {
            update((productPkg) => {
                if (!Array.isArray(productPkg)) return []
                const prodExists = productPkg.some((item) => item.id === prodItem.id)
                if (!prodExists && productPkg.length < 7) {
                    return [...productPkg, prodItem];   
                }
                return productPkg
            })
        },
        delete: (prodItem, action) => {
            update(productPkg => productPkg = productPkg.filter((item) => item.id !== prodItem.id))
            updateWishlistOnDb(userUid, prodItem, action);
        }
    }   
}

export let productPkg = createProduct()