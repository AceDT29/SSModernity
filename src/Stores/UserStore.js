import { writable } from "svelte/store"

const createUser = () => {
    const { subscribe, set } = writable(null)

    return {
        subscribe,
        addUser: (userId) => {
            set(userId)
        }
    }
}

export const User = createUser()