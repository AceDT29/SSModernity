<script>
    import { Link } from "svelte-routing";
    import { User } from "../Stores/UserStore";
    import avatarImg from "../assets/avatar.png";
    import sunIcon from "../assets/sun-regular.svg";
    import moonIcon from "../assets/moon-regular.svg";
    import homeLightIcon from "../assets/house-light.svg";
    import homeDarkIcon from "../assets/house-dark.svg";
    import messengerLightIcon from "../assets/messenger-light.svg";
    import messengerDarkIcon from "../assets/messenger-dark.svg";
    import loginSun from "../assets/login-Sun.svg";
    import loginDark from "../assets/login-Dark.svg";
    import wishListLightIcon from "../assets/wishList-light.svg";
    import wishListDarkIcon from "../assets/wishList-dark.svg";

    export let checkPlease;
    let isDarkMode;
    const userMode = localStorage.getItem("mode");

    if (userMode) {
        try {
            const parsedValue = JSON.parse(userMode);
            isDarkMode = parsedValue;
            if (isDarkMode) {
                document.body.classList.add("darkMode");
            }
        } catch (error) {
            console.error("No se pudo recuperar tu configuracion", error);
        }
    }

    function enableDark() {
        if (isDarkMode) {
            document.body.classList.add("darkMode");
        } else {
            document.body.classList.remove("darkMode");
        }
        return localStorage.setItem("mode", JSON.stringify(isDarkMode));
    }
</script>

<div
    class="sticky inset-0 top-28 z-40 w-16 h-72 p-2 border-r bg-transparent rounded-lg cursor-pointer transition-all duration-200 group hover:w-36 drop-shadow-2xl shadow-lg md:sticky lg:w-20 lg:h-[340px] animFadeRight animate-delay-200"
>
    <ul class="flex flex-col p-0 space-y-4 ml-1 mr-1">
        <li class="SideLiConfig">
            <label for="switch" class="SideIconsConfig">
                <input
                    class="hidden"
                    type="checkbox"
                    id="switch"
                    bind:checked={isDarkMode}
                    on:change={enableDark}
                />
                <img
                    class="w-full h-full"
                    src={isDarkMode ? moonIcon : sunIcon}
                    alt="Light/Dark"
                />
            </label>
            <article class="SideArtConfig">
                <p class="SideTextConfig whitespace-nowrap" id="AccText">
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </p>
            </article>
        </li>
        <Link to="/" preserveScroll>
            <li class="SideLiConfig">
                <a class="SideIconsConfig" href=".">
                    <img
                        class="w-full h-full"
                        src={isDarkMode ? homeDarkIcon : homeLightIcon}
                        alt=""
                    />
                </a>
                <article class="SideArtConfig">
                    <p class="SideTextConfig">Home</p>
                </article>
            </li>
        </Link>
        <li class="SideLiConfig">
            <a class="SideIconsConfig" href=".">
                <img
                    class="w-full h-full"
                    src={isDarkMode ? messengerDarkIcon : messengerLightIcon}
                    alt=""
                />
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
                <img
                    class="w-full h-full"
                    src={isDarkMode ? wishListDarkIcon : wishListLightIcon}
                    alt=""
                />
            </label>
            <article class="SideArtConfig">
                <p class="SideTextConfig" translate="no">Wish list</p>
            </article>
        </li>
        <li class="SideLiConfig">
            {#if $User}
                <figure
                    class="w-12 h-12 p-2 rounded-full hover:scale-105 transition duration-200 lg:w-[52px] lg:h-[52px]"
                >
                    <Link to="/Profile" preserveScroll>
                        <img
                            class="block w-full h-full rounded-full"
                            src={avatarImg}
                            alt=""
                        />
                    </Link>
                </figure>
                <article class="SideArtConfig">
                    <p class=" SideTextConfig text-[12px] lg:text-base">My Profile</p>
                </article>
            {:else}
                <figure
                    class="w-10 h-10 p-2 rounded-full ml-1 hover:scale-105 transition duration-200 md:w-12 md:h-12"
                >
                    <Link to="/Login" preserveScroll>
                        <img
                            class="block w-full h-full"
                            src={isDarkMode ? loginDark : loginSun}
                            alt=""
                        />
                    </Link>
                </figure>
                <article class="SideArtConfig">
                    <p class="SideTextConfig ">Log In</p>
                </article>
            {/if}
        </li>
    </ul>
    <slot />
</div>
