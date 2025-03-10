import { writable } from "svelte/store";

const createSearch = () => {
    const { subscribe, set, update } = writable({ allProducts: [], filteredProducts: [] });

    return {
        subscribe,
        add: (products) => {
            set({ allProducts: products, filteredProducts: products });
        },
        search: (searchKey) => {
            update(({ allProducts }) => {
                const result = allProducts.filter((type) => type.tag === searchKey);
                return { allProducts, filteredProducts: result };
            });
        }
    }
}

export let Stock = createSearch();