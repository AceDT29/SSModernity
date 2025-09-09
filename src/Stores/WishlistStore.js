import { writable } from "svelte/store"
import { User } from "./UserStore"
import { itemExists, updateWishlistOnDb } from "../Utilities/dbQuery"

let userUid = "";

User.subscribe((user) => {
    userUid = user?.uid || "";
}); 

const createEntry = () => {
    const {subscribe, update, set} = writable([])
    return {
        subscribe,
        local: (wishListPkg) => {
            set(wishListPkg)
        },
        add: async (prodItem, action) => {
            if (!userUid) return
            const onExists = await itemExists(userUid, prodItem.id);
            if (onExists) return 
            update((wishListPkg) => {
                if (!Array.isArray(wishListPkg)) return []
                const prodExists = wishListPkg.some((item) => item.id === prodItem.id)
                if (!prodExists && wishListPkg.length < 7) {
                    return [...wishListPkg, prodItem];
                }
                return wishListPkg
            })
            updateWishlistOnDb(userUid, prodItem, action);
        },
        addWithoutUser: (prodItem) => {
            update((wishListPkg) => {
                if (!Array.isArray(wishListPkg)) return []
                const prodExists = wishListPkg.some((item) => item.id === prodItem.id)
                if (!prodExists && wishListPkg.length < 7) {
                    return [...wishListPkg, prodItem];   
                }
                return wishListPkg
            })
        },
        delete: (prodItem, action) => {
            update(wishListPkg => wishListPkg = wishListPkg.filter((item) => item.id !== prodItem.id))
            updateWishlistOnDb(userUid, prodItem, action);
        }
    }   
}

export let wishListPkg = createEntry();