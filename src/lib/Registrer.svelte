<script>
    import { User } from "../Stores/UserStore"
    import { navigate, Link } from "svelte-routing"
    import { onMount } from "svelte"
    import { auth } from "../firebase/firebaseConfig"
    import { createUserWithEmailAndPassword } from "firebase/auth"
    import googleBtn from "../assets/Google.svg"
    import eyeIcon from "../assets/eye.svg"
    import eyeDontSeeIcon from "../assets/eye-dont-see.svg"

    export let signInWithGoogle
    export let validFunc
    let email = ""
    let password = ""
    let confirmValue = ""
    let emailField
    let passField
    let confirmField
    let isVisible = false
   
    async function finishRegister() {
        if(!validFunc(emailField, passField)){
            return
        } else if(!matchingValue(password, confirmValue, confirmField)) {
            return
        } else {
            try {
                const registrerRequest = await createUserWithEmailAndPassword(auth, email, password)
                const newRegistrer = registrerRequest.user
                User.addUser(newRegistrer)
                navigate("/Profile", {replace: true, preserveScroll: true})
            } catch (error) {
                console.log("Error al registrar tus datos", error)
            } 
            email = ""
            password = ""
            confirmValue = ""
        }
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
        if($User) {
            navigate("/", { replace: true, preserveScroll: true })
        }
    })

</script>

<section class="LoginSecForm justify-around">
    <div class="flex animFadeDown gap-x-4">
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
    <form on:submit|preventDefault={finishRegister} autocomplete="off" class="LoginForm w-96">
        <label class="labelForm animFadeLeft animate-delay-200" for="userEmail">
            Your Email
            <input bind:value={email} bind:this={emailField} class="LoginInput" type="email" id="userEmail" required/>
        </label>
        <label class="labelForm animFadeRight relative animate-delay-300" for="userPass">
            Create a password
            <input bind:value={password} bind:this={passField} class="LoginInput" type="password"  id="userPass" required/>
            <span class="text-sm text-slate-500">The password must be at least 8 characters long</span>
            <button on:click|preventDefault={() => showField(passField, confirmField)} class="absolute top-8 left-[71%] cursor-pointer z-10 ">
                <img class="globalImgRules w-6 h-6 transition-all" src={isVisible ? eyeDontSeeIcon : eyeIcon} alt="">
            </button>
        </label>
        <label class="labelForm animFadeLeft relative animate-delay-500" for="confirmPass">
            Confirm password
            <input bind:value={confirmValue} bind:this={confirmField} class="LoginInput" type="password" id="confirmPass" required/>
            <span class="text-sm text-slate-500">The passwords must be the same</span>
            <button on:click|preventDefault={() => showField(passField, confirmField)} class="absolute top-8 left-[71%] cursor-pointer z-10 ">
                <img class="globalImgRules w-6 h-6 transition-all" src={isVisible ? eyeDontSeeIcon : eyeIcon} alt="">
            </button>
        </label>
        <button class="text-sm self-center animFadeRight animate-delay-700 p-2 w-28 h-10 rounded-xl active:scale-90 bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer transition-all" type="submit">
            Done
        </button>
        <hr class="drop-shadow-lg animFadeRight animate-delay-700">
    </form>
    
    <div class="relative flex flex-col items-start gap-y-2 right-8 animFadeUp animate-delay-1000 ml-8">
        <h3 class="text-lg dark:text-gray-400">Or create account with Google(recomended):</h3>
        <button class="w-10 h-10 p-2 bg-white active:scale-90 rounded-full transition-all" on:click={signInWithGoogle}>
            <img class="block w-full h-full" src={googleBtn} alt="">
        </button>
    </div>    
</section>
