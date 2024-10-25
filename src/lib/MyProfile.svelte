<script>
    import { User } from "../Stores/UserStore"
    import { onMount } from "svelte"
    import { navigate } from "svelte-routing"

    onMount(() =>{
        if(!$User) {
            navigate("/Login", { replace: true, preserveScroll: true })
        }
    })
</script>

{#if $User}
    <h2>Bienvenido a tu perfil {$User.nombre}</h2>
{/if}

