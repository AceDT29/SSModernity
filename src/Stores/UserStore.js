import { writable } from "svelte/store"
import { getCurrentUser } from "../firebase/firebaseConfig"

const createUser = () => {
    const { subscribe, set } = writable(false)

    return {
        subscribe,
        addUser: (userId) => {
            set(userId)
        }, 
        currentUser: async () => {
            const userResponse = await getCurrentUser()
            set(userResponse)
        }
    }
}

export const User = createUser()