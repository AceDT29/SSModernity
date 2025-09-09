<script>
    import { onMount } from "svelte";
    import { svgIcons, avatars, backgrounds, coversExample } from "../Imports/images.d.js";

    export let user;
    export let userMethods;
    export let getConfig;
    export let signOutSession;
    export let navTo;
    const userMode = localStorage.getItem("mode");
    export let darkMode = getConfig(userMode);
    let vinilExists = false;
    let mobileViewPort = (window.innerWidth < 768) ? true : false;

    onMount(async () => {
        await userMethods.currentUser();
        if (!user) {
            navTo("/");
        }
    });
</script>


{#if user}
    <section class="LoginSecForm relative items-start gap-y-6 p-4 my-auto">
        <div class="absolute left-0 top-0 w-full h-64 cursor-pointer">
            <figure class="relative w-full h-full border-2 rounded-md bg-gradient-to-r from-cyan-400/70 to-green-400/80">
                <img
                  class="absolute w-full h-full object-cover rounded-md"
                  src={coversExample.kittyLarge}
                  srcset="{coversExample.kittySmall} 450w, {coversExample.kittyMedium} 768w, {coversExample.kittyLarge} 1200w"
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 80vw, 60vw"
                  alt="Profile cover"
                >
                <button class='HomeHiddenInfo active:scale-90 w-full h-full hover:opacity-100'>
                    <img
                     class="globalImgs transition-all rounded-md"
                      src={mobileViewPort ? backgrounds.vinylBgMobile : backgrounds.vinylBg} 
                      alt=""
                    />
                </button>
                <div class="absolute right-1 bottom-1 group">
                    <button class="relative w-8 h-8 p-1 shadow-md transition-all md:w-8 md:h-8">
                        <img class="globalImgs active:scale-90" src={svgIcons.editIconDark} alt="">
                        <div class="absolute right-0 top-10 h-auto w-auto p-1 z-10 border-1 opacity-0 group-hover:opacity-100 group-hover:animFade">
                            <p class="text-sm">Edit cover</p>
                        </div>
                    </button>
                </div>
            </figure>
        </div>
        <button
            class="relative group w-auto h-auto mt-40 rounded-full animFadeRight profile-gradient-border active:scale-95 transition-all"
            style="background: {darkMode
                ? 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)'
                : 'linear-gradient(135deg, #232526 0%, #414345 100%)'}; padding: 3px;"
        >
            <figure class="relative w-36 h-36 rounded-full group-active:scale-95 transition-all">
                <img
                    class="globalImgs rounded-full bg-white dark:bg-black"
                    src={user && user.photoURL ? user.photoURL : avatars.aceAvatar}
                    alt=""
                    style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
                />
                <div class="absolute top-0 bottom-0 right-0 left-0 w-full h-full rounded-full opacity-0 animate-duration-700 animate-delay-500 group-hover:opacity-100 group-hover:animFade">
                   <img class="globalImgs" src={backgrounds.editProfilePic} alt="">
                </div>
            </figure>
        </button>
        <h2 class="animFadeLeft text-2xl font-light font-lobster">
            Welcome to your profile {user.displayName}
        </h2>
        <div
            class={`w-full h-14 p-1 ${darkMode ? "hover:bg-slate-800/70" : "hover:bg-slate-400/80"} transition-all hover:h-36 rounded-md cursor-pointer shadow-lg animFadeDown overflow-hidden lg:w-[45%]`}
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
            <ul class="flex flex-col self-start px-2 gap-y-3 lg:px-4 lg:gap-y-1">
                <li class="flex items-center text-sm mt-2">
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
                    <button class="w-8 h-8 p-2 active:scale-90 transition-all z-10 peer">
                        <img class="globalImgs" src={darkMode ? svgIcons.editIconDark : svgIcons.editIcon} alt="">
                    </button>
                    <div class="opacity-0 peer-hover:opacity-100 peer-hover:animFade">
                        <p>Edit Name</p>
                    </div>
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
                <p>Log Out</p>
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
                <p>Delete Profile</p>
            </div>
        </button>
    </section>
{/if}

