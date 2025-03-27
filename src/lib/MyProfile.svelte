<script>
    import { User } from "../Stores/UserStore"
    import { onMount } from "svelte"
    import { navigate } from "svelte-routing"
    import { svgIcons, avatars } from "../Imports/images.d.js";

    export let getConfig
    export let signOutSession
    const userMode = localStorage.getItem("mode");
    export let darkMode = getConfig(userMode)
    
    onMount(async() => {
        await User.currentUser()
        if(!$User) {
            navigate("/", { replace: true, preserveScroll: true })
        }
    })
</script>

{#if $User}
    <section class="LoginSecForm items-start gap-y-6 p-4 my-auto">
        <figure class="z-10 w-36 h-36 rounded-full border-2 border-gray-400 animFadeRight">
            <img class="globalImgRules rounded-full" src={$User.photoURL ? $User.photoURL : avatars.aceAvatar} alt="">
        </figure>
        <h2 class="animFadeLeft text-lg font-light font-lobster">Bienvenido a tu perfil {$User.displayName}</h2>
        <div class="min-w-60 w-[45%] h-14 p-1 hover:bg-slate-300 transition-all hover:h-32 rounded-md cursor-pointer shadow-md animFadeDown overflow-hidden">
            <div class="flex justify-start items-center gap-x-2">
                <figure class="w-10 h-10 p-2 self-start">
                    <img class="globalImgRules" src={darkMode ? svgIcons.userInfoDark : svgIcons.userInfo} alt="">
                </figure>
                <h3 class="">Your account info:</h3>
            </div>
            <ul class="flex flex-col self-start px-4">
                <li class="flex items-center text-sm">
                    <figure class="w-10 h-10 p-2 self-start">
                        <img class="globalImgRules" src={darkMode ? svgIcons.nameIconDark : svgIcons.nameIcon} alt="">
                    </figure>
                    <p>{$User.displayName}</p>
                </li>
                <li class="flex items-center text-sm">
                    <figure class="w-10 h-10 p-2 self-start">
                        <img class="globalImgRules" src={darkMode ? svgIcons.emailIconDark : svgIcons.emailIcon} alt="">
                    </figure>
                    <p>{$User.email}</p>
                </li>
            </ul>
        </div>
        <button class="min-w-60 w-[45%] h-14 p-2 hover:bg-slate-300 transition-all rounded-md shadow-md animFadeDown animate-delay-300">
            <div class="flex items-center gap-x-4">
                <figure class="w-10 h-10 p-2">
                    <img class="globalImgRules" src={darkMode ? svgIcons.aboutIconDark : svgIcons.aboutIcon} alt="">
                </figure>
                <p>About Us</p>
            </div>
        </button>
        <button on:click={signOutSession} class="min-w-60 w-[45%] h-14 p-2 hover:bg-slate-300 transition-all rounded-md shadow-md animFadeDown animate-delay-300">
            <div class="flex items-center gap-x-4">
                <figure class="w-10 h-10 p-2">
                    <img class="globalImgRules" src={darkMode ? svgIcons.logOutDark : svgIcons.logOut} alt="">
                </figure>
                <p>Cerrar sesion</p>
            </div>
        </button>
        <button class="min-w-60 w-[45%] h-14 p-2 hover:bg-slate-300 transition-all rounded-md shadow-md animFadeDown animate-delay-300">
            <div class="flex items-center gap-x-4">
                <figure class="w-10 h-10 p-2">
                    <img class="globalImgRules" src={darkMode ? svgIcons.userDeleteDark : svgIcons.userDelete} alt="">
                </figure>
                <p>Eliminar perfil</p>
            </div>
        </button>
    </section>
{/if}


