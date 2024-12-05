<script>
    import { Link, navigate } from "svelte-routing"
    import { validFunc } from "../utilities/ValidField"
    import { User } from "../Stores/UserStore"
    import { onMount } from "svelte"
    import googleBtn from "../assets/Google.svg"

    let emailValue
    let passValue
    let emailField
    let passField

    function userInfoHandler() {
        if(!validFunc(emailValue, passValue, emailField, passField) ) {
            console.log("numero de caracteres invalido")
            return
        } else {
            let newUser = {
                nombre: "anonimo",
                correo: emailValue,
                contraseña: passValue
            }
            User.addUser(newUser)
            navigate("/", {replace: true, preserveScroll: true})
        }
    }

    onMount(() =>{
        if($User) {
            navigate("/", { replace: true, preserveScroll: true })
        }
    })
</script>

<section class="SecForm">
    
    <div class="flex animFadeDown animate-delay-200 gap-x-4">
        <div class="flex group flex-col cursor-pointer">
            <h2 class="text-2xl">SignIn</h2>
            <span class="w-full h-1 rounded-md bg-blue-700/70 shadow-lg animFadeLeft"></span> 
        </div>
    <Link to="/SignUp" preserveScroll>
        <div class="flex group flex-col cursor-pointer">
            <button class="text-2xl text-slate-800/80">SignUp</button>
        </div>
    </Link>
    </div>
    
    <form class="z-10 LoginForm h-auto" on:submit|preventDefault={userInfoHandler}>
        <label class="animFadeLeft animate-delay-300" for="emailID">
            Email
            <input bind:value={emailValue} bind:this={emailField} class="LoginInput" type="email" placeholder="Example@gmail.com" id="emailID" required/>
        </label>
        <label class="animFadeRight animate-delay-400" for="passID">
            Password
            <input bind:value={passValue} bind:this={passField} class="LoginInput" type="password" placeholder="******" id="passID" required/>
            <span class="text-sm text-slate-500"></span>
        </label>
        <button class="w-24 h-10 p-2 rounded-lg bg-gradient-to-r text-white self-center from-sky-700 to-blue-600 animFadeLeft animate-delay-500" type="submit">
            Log in
        </button>
        <hr class=" drop-shadow-lg animFadeRight animate-delay-700">
       
        <div class="animFadeUp animate-delay-1000">
            <h3 class="text-lg mb-8 dark:text-gray-400">Or SignIn with providers:</h3>
            <button class="w-10 h-10 p-2 bg-white active:scale-90 rounded-full transition-all">
                <img class="block w-full h-full" src={googleBtn} alt="">
            </button>
        </div>    
    </form>
</section>
