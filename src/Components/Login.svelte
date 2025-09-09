<script>
    import { Link } from "svelte-routing"
    import { beforeUpdate } from "svelte"
    import { svgIcons } from "../Imports/images.d.js"
    import Advisor from "./Advisor.svelte"
    
    export let user
    export let auth
    export let signInUser
    export let userMethods
    export let navTo
    export let signInWithGoogle
    export let validFunc
    
    let isVisible = false
    let emailValue = ""
    let passValue = ""
    let emailField
    let passField
    let showExcep = false; 
    let excepResult = [];
    

    async function LogIn() {
        const abortController = new AbortController();
        if(!validFunc(emailField, passField)) {
            return
        } else {
            try {
                const response = await signInUser(auth, emailValue, passValue)
                userMethods.addUser(response.user)
                navTo("/")
            } catch (error) {
                if (abortController.signal.aborted) {
                    console.log(error)
                } else {
                    errorHandler(error.code)
                }
                
            } 
        }
        emailValue = ""
        passValue = ""
    }

    const errorHandler = (err) => {
        let errValue 
        switch (err) {
            case 'auth/network-request-failed':
                errValue = generateMessage(404, 'Error de red al procesar tu solicitud')
                excepResult = [errValue]
                break;
            case 'auth/invalid-credential':
                errValue = generateMessage(400, 'Email y/o contraseña incorrectos')
                excepResult = [errValue]
                break;
            case 'auth/email-already-in-use':
                errValue = generateMessage(409, 'Este usuario ya ha sido registrado en SSmodernity')
                excepResult = [errValue]
                break;
            case 'auth/popup-closed-by-user':
                errValue = generateMessage(499, 'El popup fue cerrado antes de completar la autenticación')
                excepResult = [errValue]
                break;
        }  
        showExcep = true
    }

    function generateMessage(code, message) {
        const newMsg = {
        code,
        message
        }
        return newMsg
    }

    function showField(field) {
        isVisible = !isVisible
        field.type = isVisible ? 'text' : 'password'
    }

    beforeUpdate(() =>{
        if(user) {
            navTo("/")
        }
    })
</script>

<Advisor bind:displayExcep={showExcep} exception={excepResult} />
<section class="LoginSecForm">
    <div class="flex animFadeDown animate-delay-100 gap-x-4 font-lobster">
        <div class="flex group flex-col cursor-pointer">
            <h2 class="text-2xl">SignIn</h2>
            <span class="w-full h-1 rounded-md bg-blue-700/70 shadow-lg animFadeLeft"></span> 
        </div>
    <Link to="/SignUp" preserveScroll>
        <div class="flex group flex-col cursor-pointer">
            <button class="text-2xl text-slate-600/80">SignUp</button>
        </div>
    </Link>
    </div>
    
    <form class="z-10 LoginForm h-auto" on:submit|preventDefault={LogIn}>
        <label class="animFadeLeft animate-delay-200" for="emailID">
            Email
            <input bind:value={emailValue} bind:this={emailField} class="LoginInput" type="email" placeholder="Example@gmail.com" id="emailID" required/>
        </label>
        <label class="animFadeRight animate-delay-300 relative" for="passID">
            Password
            <input bind:value={passValue} bind:this={passField} class="LoginInput" type="password" placeholder="******" autocomplete="off" id="passID" required/>
            <span class="text-sm text-slate-500"></span>
            <button on:click|preventDefault={() => showField(passField)} class="absolute top-8 left-[85%] cursor-pointer z-10 ">
                <img class="globalImgs w-6 h-6 transition-all" src={isVisible ? svgIcons.eyeDontSeeIcon : svgIcons.eyeIcon} alt="">
            </button>
        </label>
        <button class="w-24 h-10 p-2 rounded-lg bg-gradient-to-r text-white self-center
         from-sky-700 to-blue-600 animFadeLeft animate-delay-500 font-lobster" type="submit">
            Log in
        </button>
        <hr class="drop-shadow-lg animFadeRight animate-delay-700 ">
    </form>
    <div class="relative flex flex-col items-start gap-y-2 right-8 animFadeUp animate-delay-1000 font-lobster">
        <h3 class="text-lg dark:text-gray-400">Or SignIn with Google:</h3>
        <button class="w-10 h-10 p-2 bg-white active:scale-90 rounded-full transition-all" on:click={signInWithGoogle(errorHandler)}>
            <img class="block w-full h-full" src={svgIcons.googleBtn} alt="">
        </button>
    </div>    
</section>
