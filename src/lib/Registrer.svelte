<script>
    import { Link } from "svelte-routing"
    import { onMount } from "svelte"
    import { svgIcons } from "../Imports/images.d";
    import Advisor from "./Advisor.svelte"

    export let user
    export let auth
    export let createUser
    export let userMethods
    export let signInWithGoogle
    export let validFunc
    export let navTo
    
    let isVisible = false
    let email = ""
    let password = ""
    let confirmValue = ""
    let emailField
    let passField
    let confirmField
    let showExcep = false; 
    let excepResult = [];
    
   
    async function finishRegister() {
        if(!validFunc(emailField, passField)){
            return
        } else if(!matchingValue(password, confirmValue, confirmField)) {
            return
        } else {
            try {
                const registrerRequest = await createUser(auth, email, password)
                const newRegistrer = registrerRequest.user
                userMethods.addUser(newRegistrer)
                navTo("/Profile")
            } catch (error) {
                errorHandler(error.code)
            } 
            email = ""
            password = ""
            confirmValue = ""
        }
    }

    const errorHandler = (err) => {
    let errValue 
        if(err == 'auth/network-request-failed') {
            errValue = (generateMessage(404, 'Error de red al procesar tu solicitud'))
            excepResult = [errValue] 
        } else if(err == 'auth/invalid-credential') {
            errValue = generateMessage(404, 'Email y/o contraseña incorrectos')
            excepResult = [errValue]
        } else if (err  == 'auth/email-already-in-use' ) {
            errValue = (generateMessage(404, 'Este usuario ya ha sido registrado en SSmodernity'))
            excepResult = [errValue]
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

    const matchingValue = (value, confirmValue, field) => {
        let check = false
        if(value !== confirmValue) {
            field.style.borderColor = "red"
            field.nextElementSibling.textContent = "The Passwords don't match"
        } else {
            field.style.borderColor = "green"
        }
        return check = value === confirmValue
    }

    function showField(field, siblingField) {
        isVisible = !isVisible
        field.type = isVisible ? 'text' : 'password'
        siblingField.type = isVisible ? 'text' : 'password'
    }

    onMount(() =>{
        if(user) {
            navTo("/")
        }
    })

</script>

<Advisor bind:displayExcep={showExcep} exception={excepResult} />
<section class="LoginSecForm justify-around">
    <div class="flex animFadeDown gap-x-4 font-lobster">
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
    <form on:submit|preventDefault={finishRegister} autocomplete="off" class="LoginForm h-auto w-96">
        <label class="labelForm animFadeLeft animate-delay-200" for="userEmail">
            Your Email
            <input bind:value={email} bind:this={emailField} class="LoginInput" type="email" id="userEmail" required/>
        </label>
        <label class="labelForm animFadeRight relative animate-delay-300" for="userPass">
            Create a password
            <input bind:value={password} bind:this={passField} class="LoginInput" type="password"  id="userPass" required/>
            <span class="text-sm text-slate-500">The password must be at least 8 characters long</span>
            <button on:click|preventDefault={() => showField(passField, confirmField)} class="absolute top-8 left-[71%] cursor-pointer z-10 ">
                <img class="globalImgRules w-6 h-6 transition-all" src={isVisible ? svgIcons.eyeDontSeeIcon : svgIcons.eyeIcon} alt="">
            </button>
        </label>
        <label class="labelForm animFadeLeft relative animate-delay-500" for="confirmPass">
            Confirm password
            <input bind:value={confirmValue} bind:this={confirmField} class="LoginInput" type="password" id="confirmPass" required/>
            <span class="text-sm text-slate-500">The passwords must be the same</span>
            <button on:click|preventDefault={() => showField(passField, confirmField)} class="absolute top-8 left-[71%] cursor-pointer z-10 ">
                <img class="globalImgRules w-6 h-6 transition-all" src={isVisible ? svgIcons.eyeDontSeeIcon : svgIcons.eyeIcon} alt="">
            </button>
        </label>
        <button class="text-sm self-center animFadeRight animate-delay-700 p-2 w-28 h-10 rounded-xl active:scale-90 bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer transition-all font-lobster" type="submit">
            Done
        </button>
        <hr class="min-w-[50%] self-center drop-shadow-lg animFadeRight animate-delay-700 lg:w-[90%]">
    </form>
    <div class="relative flex flex-col items-center flex-wrap gap-y-2 right-8 animFadeUp animate-delay-1000 ml-8 lg:items-start font-lobster">
        <h3 class="text-lg text-center dark:text-gray-400">Or create account with Google(recomended):</h3>
        <button class="w-10 ml-12 self-start h-10 p-2 bg-white active:scale-90 rounded-full transition-all md:ml-0" on:click={signInWithGoogle}>
            <img class="block w-full h-full" src={svgIcons.googleBtn} alt="">
        </button>
    </div>    
</section>
