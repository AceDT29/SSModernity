import { writable, get } from "svelte/store"
import { User } from "./UserStore"
import { itemExists, addToWishlistOnDb } from "../Utilities/dbQuery"

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
        add: async (prodItem) => {
            if (!userUid) return
            const onExists = await itemExists(userUid, prodItem.id);
            if (onExists) return;
            update((productPkg) => {
                if (!Array.isArray(productPkg)) return []
                const prodExists = productPkg.some((item) => item.id === prodItem.id)
                if (!prodExists && productPkg.length < 7) {
                    return [...productPkg, prodItem];
                }
                return productPkg
            })
            addToWishlistOnDb(userUid, prodItem);
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
        delete: (name) => {
            update(productPkg => productPkg = productPkg.filter((item) => item.name !== name))
        }
    }   
}

export let productPkg = createProduct()