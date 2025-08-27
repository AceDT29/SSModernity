import { writable } from "svelte/store";

const createSearch = () => {
    const { subscribe, set, update } = writable({ allProducts: [], filteredProducts: [] });

    return {
        subscribe,
        add: (products) => {
            set({ allProducts: products, filteredProducts: products });
        },
        fillProds: (searchKey) => {
            update(({ allProducts }) => {
                const result = allProducts.filter((type) => type.tag === searchKey);
                return { allProducts, filteredProducts: result };
            });
        }, 
        findProd: (itemKey) => {
            update(({allProducts, filteredProducts}) => {
                const resultFromAll = allProducts.find((id) => id.name === itemKey.name);
                const resultFromFiltered = filteredProducts.find((id) => id.name === itemKey.name);
                const result = resultFromAll || resultFromFiltered;
                return { allProducts, filteredProducts: result ? [result] : [] }
            })
        },
        searchByName: (textEntry) => {
            update(({ allProducts }) => {
                if (!textEntry || textEntry.trim() === "") {
                    return { allProducts, filteredProducts: allProducts };
                }
                const filtered = allProducts.filter(prod =>
                    prod.name.toLowerCase().includes(textEntry.toLowerCase())
                );
                return { allProducts, filteredProducts: filtered };
            });
        }
    }
}

export let Stock = createSearch();