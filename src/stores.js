import { writable } from "svelte/store"

const createProduct = () => {
    const {subscribe, update, set} = writable([])

    return {
        subscribe,
        local: (productPkg) => {
            set(productPkg)
        },
        add: (prodItem) => {
            update(productPkg => {
                if (!Array.isArray(productPkg)) {
                    console.error("productPkg no es un array, inicializando como vacío.")
                    return []
                }
                const prodExists = productPkg.some((item) => item.name === prodItem.name)
                if (!prodExists && productPkg.length < 7) {
                    return [...productPkg, prodItem]
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