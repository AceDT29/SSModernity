<script>
    import { User } from "../Stores/UserStore"
    import { onMount } from "svelte"
    import { navigate } from "svelte-routing"
    import { auth } from "../firebase/firebaseConfig"
    import { signOut } from "firebase/auth"

    const sessionOut = () => {
        signOut(auth).then(() => {
            User.addUser(null)
            navigate("/Login", { replace: true, preserveScroll: true })
        })
    }

    onMount(() =>{
        if(!$User) {
            navigate("/Login", { replace: true, preserveScroll: true })
        }
    })
</script>

{#if $User}
   <section class="LoginSecForm items-start gap-y-8 p-4">
        <h2>Bienvenido a tu perfil {$User.displayName}</h2>
        <button class="w-64 h-24 hover:bg-slate-300 transition-all rounded-md" on:click={sessionOut}>
            <p>Cerrar sesion</p>
        </button>
    </section>
{/if}

