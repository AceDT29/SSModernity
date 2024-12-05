<script>
    import { User } from "../Stores/UserStore"
    import { navigate, Link } from "svelte-routing"
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

<section class="SecForm">

    <div class="flex animFadeDown animate-delay-200 gap-x-4">
        <div class="flex group flex-col cursor-pointer">
            <h2 class="text-2xl">SignUp</h2>
            <span class="w-full h-1 rounded-md bg-blue-700/70 shadow-lg animFadeLeft"></span>
        </div>
    <Link to="/Login" preserveScroll>
        <div class="flex group flex-col cursor-pointer">
            <button class="text-2xl text-slate-600/80">SignIn</button> 
        </div>
    </Link>
    </div>

    <form on:submit|preventDefault={finishRegister} class="LoginForm w-96">
        <label class="labelForm flex-wrap animFadeRight animate-delay-200" for="userName">
            Your name
            <input bind:value={name} class="LoginInput" type="text" id="userName"  required/>
        </label>
        <label class="labelForm animFadeLeft animate-delay-500" for="userEmail">
            Your Email
            <input bind:value={email} bind:this={emailField} class="LoginInput" type="email" id="userEmail" required/>
        </label>
        <label class="labelForm animFadeRight animate-delay-700" for="userPass">
            Create a password
            <input bind:value={password} bind:this={passField} class="LoginInput" type="text"  id="userPass" required/>
            <span class="text-sm text-slate-500">The password must be at least 6 characters long</span>
        </label>
        <button class="text-sm self-center animFadeUp animate-delay-1000 p-2 w-28 h-10 rounded-xl active:scale-90 bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer transition-all" type="submit">
            Done
        </button>
    </form>
</section>
