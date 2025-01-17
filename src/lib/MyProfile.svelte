<script>
    import { User } from "../Stores/UserStore"
    import { onMount } from "svelte"
    import { navigate } from "svelte-routing"
    import { auth } from "../firebase/firebaseConfig"
    import { signOut } from "firebase/auth"
    import userInfo from "../assets/UserInfo.svg"
    import userInfoDark from "../assets/UserInfoDark.svg"
    import nameIcon from "../assets/name.svg"
    import nameIconDark from "../assets/name-dark.svg"
    import emailIcon from "../assets/email.svg"
    import emailIconDark from "../assets/email-dark.svg"
    import userDelete from "../assets/UserDelete.svg"
    import userDeleteDark from "../assets/UserDeleteDark.svg"
    import logOut from "../assets/Logout.svg"
    import logOutDark from "../assets/LogoutDark.svg"
    import aboutIcon from "../assets/about.svg"
    import aboutIconDark from "../assets/aboutDark.svg"

    export let getConfig
    const userMode = localStorage.getItem("mode");
    export let darkMode = getConfig(userMode)
    
    const sessionOut = () => {
        signOut(auth).then(() => {
            User.addUser(null)
            navigate("/Login", { replace: true, preserveScroll: true })
        })
    }

    onMount(async() => {
        await User.currentUser()
        if(!$User) {
            navigate("/", { replace: true, preserveScroll: true })
        }
    })
</script>

{#if $User}
    <section class="LoginSecForm items-start gap-y-6 p-4">
        <figure>
            <img src="" alt="">
        </figure>
        <h2>Bienvenido a tu perfil {$User.displayName}</h2>
        <div class="w-80 h-32 p-2 hover:bg-slate-300 transition-all rounded-md shadow-md animFadeDown">
            <div class="flex justify-start items-center gap-x-2">
                <figure class="w-10 h-10 p-2 self-start">
                    <img class="globalImgRules" src={darkMode ? userInfoDark : userInfo} alt="">
                </figure>
                <h3 class="">Your account info:</h3>
            </div>
            <ul class="flex flex-col self-start px-4">
                <li class="flex items-center text-sm">
                    <figure class="w-10 h-10 p-2 self-start">
                        <img class="globalImgRules" src={darkMode ? nameIconDark : nameIcon} alt="">
                    </figure>
                    <p>{$User.email}</p>
                </li>
                <li class="flex items-center text-sm">
                    <figure class="w-10 h-10 p-2 self-start">
                        <img class="globalImgRules" src={darkMode ? emailIconDark : emailIcon} alt="">
                    </figure>
                    <p>{$User.displayName}</p>
                </li>
            </ul>
        </div>
        <button class="">
            <div class="flex items-center gap-x-4 w-80 h-14 p-2 hover:bg-slate-300 transition-all rounded-md shadow-md animFadeDown animate-delay-300">
                <figure class="w-10 h-10 p-2">
                    <img class="globalImgRules" src={darkMode ? aboutIconDark : aboutIcon} alt="">
                </figure>
                <p>About Us</p>
            </div>
        </button>
        <button class="" on:click={sessionOut}>
            <div class="flex items-center gap-x-3 w-80 h-14 p-2 hover:bg-slate-300 transition-all rounded-md shadow-md animFadeDown animate-delay-500">
                <figure class="w-10 h-10 p-2">
                    <img class="globalImgRules" src={darkMode ? logOutDark : logOut} alt="">
                </figure>
                <p>Cerrar sesion</p>
            </div>
        </button>
        <button class="">
            <div class="flex items-center gap-x-3 w-80 h-14 p-2 hover:bg-slate-300 transition-all rounded-md shadow-md animFadeDown animate-delay-700">
                <figure class="w-10 h-10 p-2">
                    <img class="globalImgRules" src={darkMode ? userDeleteDark : userDelete} alt="">
                </figure>
                <p>Eliminar perfil</p>
            </div>
        </button>
    </section>
{/if}


