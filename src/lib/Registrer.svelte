<script>
    import { User } from "../Stores/UserStore"
    import { navigate } from "svelte-routing"
    import { validFunc } from "../utilities/ValidField.js"
    import { onMount } from "svelte"

    let emailField
    let passField
    let name = ""
    let email = ""
    let password = ""

    class SSUser {
        constructor(nombre, email, contraseña) {
            this.nombre = nombre
            this.email = email
            this.contraseña = contraseña
        }
    }

    function finishRegister() {
        if(!validFunc(email, password, emailField, passField)){
            return
        } else {
            const newAccount = new SSUser(name, email, password)
            User.addUser(newAccount)
            navigate("/Profile", { replace: true, preserveScroll: true})
        }
    }

    onMount(() =>{
        if($User) {
            navigate("/Home", { replace: true, preserveScroll: true })
        }
    })

</script>

<section class="flex flex-col flex-grow p-2 mb-24">
    <h2>Registro</h2>
    <form on:submit|preventDefault={finishRegister} class="LoginForm w-96">
        <label class="flex flex-col items-start gap-y-2 flex-wrap" for="userName">
            Coloca tu nombre
            <input bind:value={name} class="LoginInput" type="text" id="userName"  required/>
        </label>
        <label class="flex flex-col items-start gap-y-2" for="userEmail">
            Direccion de correo
            <input bind:value={email} bind:this={emailField} class="LoginInput" type="email" id="userEmail" required/>
        </label>
        <label class="flex flex-col items-start gap-y-2" for="userPass">
            Crea una contraseña
            <input bind:value={password} bind:this={passField} class="LoginInput" type="text"  id="userPass" required/>
            <span class="text-sm text-slate-500">La contraseña debe tener un minimo de 6 caracteres</span>
        </label>
        <input class="text-sm p-2 w-28 h-10 rounded-xl active:scale-90 bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer transition-all" type="submit">
    </form>
</section>
