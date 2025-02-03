<script>
    import { Link, navigate } from "svelte-routing"
    import { User } from "../Stores/UserStore"
    import { beforeUpdate } from "svelte"
    import { auth } from "../firebase/firebaseConfig"
    import { signInWithEmailAndPassword } from "firebase/auth"
    import googleBtn from "../assets/Google.svg"
    import eyeIcon from "../assets/eye.svg"
    import eyeDontSeeIcon from "../assets/eye-dont-see.svg"
   
    export let signInWithGoogle
    export let validFunc
    let emailValue = ""
    let passValue = ""
    let emailField
    let passField
    let isVisible = false

    async function userInfoHandler() {
        if(!validFunc(emailField, passField)) {
            return
        } else {
            try {
                const response = await signInWithEmailAndPassword(auth, emailValue, passValue)
                User.addUser(response.user)
                navigate("/", {replace: true, preserveScroll: true})
            } catch (error) {
                console.log("No se ha podido completar tu ingreso", error)
            } 
        }
        emailValue = ""
        passValue = ""
    }

    function showField(field) {
        isVisible = !isVisible
        field.type = isVisible ? 'text' : 'password'
    }

    beforeUpdate(() =>{
        if($User) {
            navigate("/", { replace: true, preserveScroll: true })
        }
    })
</script>

<section class="LoginSecForm">
    <div class="flex animFadeDown animate-delay-100 gap-x-4">
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
    
    <form class="z-10 LoginForm h-auto" on:submit|preventDefault={userInfoHandler}>
        <label class="animFadeLeft animate-delay-200" for="emailID">
            Email
            <input bind:value={emailValue} bind:this={emailField} class="LoginInput" type="email" placeholder="Example@gmail.com" id="emailID" required/>
        </label>
        <label class="animFadeRight animate-delay-300 relative" for="passID">
            Password
            <input bind:value={passValue} bind:this={passField} class="LoginInput" type="password" placeholder="******" autocomplete="off" id="passID" required/>
            <span class="text-sm text-slate-500"></span>
            <button on:click|preventDefault={() => showField(passField)} class="absolute top-8 left-[85%] cursor-pointer z-10 ">
                <img class="globalImgRules w-6 h-6 transition-all" src={isVisible ? eyeDontSeeIcon : eyeIcon} alt="">
            </button>
        </label>
        <button class="w-24 h-10 p-2 rounded-lg bg-gradient-to-r text-white self-center from-sky-700 to-blue-600 animFadeLeft animate-delay-500" type="submit">
            Log in
        </button>
        <hr class="drop-shadow-lg animFadeRight animate-delay-700">
    </form>
    <div class="relative flex flex-col items-start gap-y-2 right-8 animFadeUp animate-delay-1000">
        <h3 class="text-lg dark:text-gray-400">Or SignIn with Google:</h3>
        <button class="w-10 h-10 p-2 bg-white active:scale-90 rounded-full transition-all" on:click={signInWithGoogle}>
            <img class="block w-full h-full" src={googleBtn} alt="">
        </button>
    </div>    
</section>
