<script>
    import { Link } from "svelte-routing";
    import { beforeUpdate } from "svelte";
    import { svgIcons, avatars } from "../Imports/images.d.js";
    
    export let user
    export let checkPlease;
    export let getConfig
    export let switchMode
    const userMode = localStorage.getItem("mode");
    export let darkMode = getConfig(userMode)

    beforeUpdate(() => {
        switchMode(darkMode)
    })
</script>

<div
    class="sticky inset-0 top-28 z-40 w-16 h-72 p-2 border-r bg-transparent rounded-lg cursor-pointer transition-all duration-200 group hover:w-36 drop-shadow-2xl shadow-lg md:sticky lg:w-20 lg:h-[340px] animFadeRight animate-delay-200 font-lobster"
>
    <ul class="flex flex-col p-0 space-y-4 ml-1 mr-1">
        <li class="SideLiConfig">
            <label for="switch" class="SideIconsConfig">
                <input
                    class="hidden"
                    type="checkbox"
                    id="switch"
                    bind:checked={darkMode}
                />
                <figure class="SideFigureConfig">
                    <img
                    class="w-full h-full"
                    src={darkMode ? svgIcons.moonIcon : svgIcons.sunIcon}
                    alt="Light/Dark"
                    />
                </figure>
                <article class="SideArtConfig">
                    <p class="SideTextConfig whitespace-nowrap" id="AccText">
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </p>
                </article>
            </label>
        </li>
        <Link to="/" preserveScroll>
            <li class="SideLiConfig">
                <a class="SideIconsConfig" href=".">
                    <figure class="SideFigureConfig">
                        <img
                        class="w-full h-full"
                        src={darkMode ? svgIcons.homeDarkIcon : svgIcons.homeLightIcon}
                        alt=""
                        />
                    </figure>
                </a>
                <article class="SideArtConfig">
                    <p class="SideTextConfig">Home</p>
                </article>
            </li>
        </Link>
        <li class="SideLiConfig">
            <a class="SideIconsConfig" href=".">
                <figure class="SideFigureConfig">
                    <img
                    class="w-full h-full"
                    src={darkMode ? svgIcons.messengerDarkIcon : svgIcons.messengerLightIcon}
                    alt=""
                />
                </figure>
            </a>
            <article class="SideArtConfig">
                <p class="SideTextConfig">Messages</p>
            </article>
        </li>
        <li class="SideLiConfig">
            <label for="checkWish" class="SideIconsConfig">
                <input
                    class="hidden"
                    type="checkbox"
                    id="checkWish"
                    bind:checked={checkPlease}
                />
                <figure class="SideFigureConfig">
                    <img
                    class="w-full h-full"
                    src={darkMode ? svgIcons.wishListDarkIcon : svgIcons.wishListLightIcon}
                    alt=""
                    />
                </figure>
                <article class="SideArtConfig">
                    <p class="SideTextConfig" translate="no">Wish list</p>
                </article>
            </label>
        </li>
        {#if user}
            <Link to="/Profile" preserveScroll>
                <li class="SideLiConfig">
                    <figure class="w-12 h-12 p-2 rounded-full hover:scale-105 transition duration-200 lg:w-[52px] lg:h-[52px] ">
                            <img
                                class="block w-full h-full rounded-full border border-slate-400"
                                src={user && user.photoURL ? user.photoURL : avatars.aceAvatar}
                                alt=""
                            />
                    </figure>
                    <article class="SideArtConfig">
                        <p class=" SideTextConfig text-[12px] lg:text-base">My Profile</p>
                    </article>
                </li>
            </Link>
        {:else}
            <Link to="/Login" preserveScroll>
            <li class="SideLiConfig">
                <figure class="w-10 h-10 p-2 rounded-full ml-1 hover:scale-105 transition duration-200 lg:w-12 lg:h-12">
                        <img
                            class="block w-full h-full"
                            src={darkMode ? svgIcons.loginDark : svgIcons.loginSun}
                            alt=""
                        />
                </figure>
                <article class="SideArtConfig">
                    <p class="SideTextConfig ">Log In</p>
                </article>
            </li>
            </Link>
         {/if}
    </ul>
    <slot />
</div>
