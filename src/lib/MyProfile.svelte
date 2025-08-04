<script>
    import { onMount } from "svelte";
    import { svgIcons, avatars, backgrounds } from "../Imports/images.d.js";

    export let user;
    export let userMethods;
    export let getConfig;
    export let signOutSession;
    export let navTo;
    const userMode = localStorage.getItem("mode");
    export let darkMode = getConfig(userMode);
    let vinilExists = false;

    onMount(async () => {
        await userMethods.currentUser();
        if (!user) {
            navTo("/");
        }
    });
</script>

{#if user}
    <section class="LoginSecForm relative items-start gap-y-6 p-4 my-auto">
        <div class="absolute left-0 top-0 w-full h-56 cursor-pointer">
            <figure class="relative w-full h-full border-2 bg-gradient-to-r from-cyan-400/70 to-green-400/80">
                <figcaption class='HomeHiddenInfo w-full h-full hover:opacity-100'>
                    <img class="globalImgs active:scale-90 transition-all" src={backgrounds.vinylIcon} alt="">
                </figcaption>
            </figure>
        </div>
        <figure
            class="z-10 w-36 h-36 mt-28 rounded-full animFadeRight profile-gradient-border"
            style="background: {darkMode
                ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)'
                : 'linear-gradient(135deg, #232526 0%, #414345 100%)'}; padding: 3px;"
        >
            <img
                class="globalImgs rounded-full bg-white dark:bg-black"
                src={user && user.photoURL ? user.photoURL : avatars.aceAvatar}
                alt=""
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
            />
        </figure>
        <h2 class="animFadeLeft text-lg font-light font-lobster">
            Bienvenido a tu perfil {user.displayName}
        </h2>
        <div
            class={`min-w-60 w-[45%] h-14 p-1 ${darkMode ? "hover:bg-slate-800/70" : "hover:bg-slate-400/80"} transition-all hover:h-32 rounded-md cursor-pointer shadow-md animFadeDown overflow-hidden`}
        >
            <div class="flex justify-start items-center gap-x-2">
                <figure class="w-10 h-10 p-2 self-start">
                    <img
                        class="globalImgs"
                        src={darkMode
                            ? svgIcons.userInfoDark
                            : svgIcons.userInfo}
                        alt=""
                    />
                </figure>
                <h3 class="">Your account info:</h3>
            </div>
            <ul class="flex flex-col self-start px-4">
                <li class="flex items-center text-sm">
                    <figure class="w-10 h-10 p-2 self-start">
                        <img
                            class="globalImgs"
                            src={darkMode
                                ? svgIcons.nameIconDark
                                : svgIcons.nameIcon}
                            alt=""
                        />
                    </figure>
                    <p>{user.displayName}</p>
                </li>
                <li class="flex items-center text-sm">
                    <figure class="w-10 h-10 p-2 self-start">
                        <img
                            class="globalImgs"
                            src={darkMode
                                ? svgIcons.emailIconDark
                                : svgIcons.emailIcon}
                            alt=""
                        />
                    </figure>
                    <p>{user.email}</p>
                </li>
            </ul>
        </div>
        <button
            class={darkMode ? "profileButtons hover:bg-slate-800/70" : "profileButtons hover:bg-slate-400/80"}
        >
            <div class="flex items-center gap-x-4">
                <figure class="w-10 h-10 p-2">
                    <img
                        class="globalImgs"
                        src={darkMode
                            ? svgIcons.aboutIconDark
                            : svgIcons.aboutIcon}
                        alt=""
                    />
                </figure>
                <p>About Us</p>
            </div>
        </button>
        <button
            on:click={signOutSession}
            class={darkMode ? "profileButtons hover:bg-slate-800/70" : "profileButtons hover:bg-slate-400/80"}
        >
            <div class="flex items-center gap-x-4">
                <figure class="w-10 h-10 p-2">
                    <img
                        class="globalImgs"
                        src={darkMode ? svgIcons.logOutDark : svgIcons.logOut}
                        alt=""
                    />
                </figure>
                <p>Cerrar sesion</p>
            </div>
        </button>
        <button
            class={darkMode ? "profileButtons hover:bg-slate-800/70" : "profileButtons hover:bg-slate-400/80"}
        >
            <div class="flex items-center gap-x-4">
                <figure class="w-10 h-10 p-2">
                    <img
                        class="globalImgs"
                        src={darkMode
                            ? svgIcons.userDeleteDark
                            : svgIcons.userDelete}
                        alt=""
                    />
                </figure>
                <p>Eliminar perfil</p>
            </div>
        </button>
    </section>
{/if}

