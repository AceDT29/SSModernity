<script>
  import { createEventDispatcher } from "svelte";
  import avatarImg from "../assets/avatar.png"
  import sunIcon from "../assets/sun-regular.svg"
  import moonIcon from "../assets/moon-regular.svg"
  import homeLightIcon from "../assets/house-light.svg"
  import homeDarkIcon from "../assets/house-dark.svg"
  import messengerLightIcon from "../assets/messenger-light.svg"
  import messengerDarkIcon from "../assets/messenger-dark.svg"
  import wishListLightIcon from "../assets/wishList-light.svg"
  import wishListDarkIcon from "../assets/wishList-dark.svg"
  
  const dispatch = createEventDispatcher()
  let isDarkMode = false
  
  function enableDark(){
    isDarkMode = !isDarkMode
    dispatch('ChangeMode', { isDarkMode })
  }
</script>

<nav class="relative bottom-[550px] z-10 w-20 h-[90vh] p-3 ml-2 mb-12 border-2 bg-transparent rounded-lg cursor-pointer transition-all duration-200 group hover:w-40 drop-shadow-lg">
    <ul class="flex flex-col p-0 space-y-4">
        <li class="grid grid-cols-[max-content,_0fr] group-hover:grid-cols-[max-content,_2fr] rounded-md">
            <button class="block w-12 h-12 bg-transparent border-1 rounded-lg active:scale-90 transition duration-200 cursor-pointer p-2" on:click={enableDark}>
                <img class="w-full h-full" src={isDarkMode ? moonIcon : sunIcon} alt="Light/Dark">
            </button>
            <article class="overflow-hidden group-hover:block relative">
                <p class="text-center font-extralight py-3 absolute" id="AccText">{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
            </article>
        </li>
        <li class="grid grid-cols-[max-content,_0fr] group-hover:grid-cols-[max-content,_2fr] rounded-md">
            <a class="block w-12 h-12 bg-transparent border-1 rounded-lg active:scale-90 transition duration-200 cursor-pointer p-2" href=".">
                <img class="w-full h-full" src={isDarkMode ? homeDarkIcon : homeLightIcon} alt="">
            </a>
            <article class="overflow-hidden group-hover:block relative">
                <p class="text-center font-extralight py-3 absolute">Home</p>
            </article>
        </li>
        <li class="grid grid-cols-[max-content,_0fr] group-hover:grid-cols-[max-content,_2fr] rounded-md">
            <a class="block w-12 h-12 bg-transparent border-1 rounded-lg active:scale-90 transition duration-200 cursor-pointer p-2" href=".">
                <img class="w-full h-full" src={isDarkMode ? messengerDarkIcon : messengerLightIcon} alt="">
            </a>
            <article class="overflow-hidden group-hover:block relative">
                <p class="text-center font-extralight py-3 absolute">Messages</p>
            </article>
        </li>
        <li class="grid grid-cols-[max-content,_0fr] group-hover:grid-cols-[max-content,_2fr] rounded-md">
            <a class="block w-12 h-12 bg-transparent border-1 rounded-lg active:scale-90 transition duration-200 cursor-pointer p-2" href=".">
                <img class="w-full h-full" src={isDarkMode ? wishListDarkIcon : wishListLightIcon}  alt="">
            </a>
            <article class="overflow-hidden group-hover:block relative">
                <p class="text-center font-extralight py-3 absolute">Wish list</p>
            </article>
        </li>
        <li class="grid grid-cols-[max-content,_0fr] group-hover:grid-cols-[max-content,_2fr] rounded-md relative top-44">
            <figure class="w-[52px] h-[52px] p-2 rounded-full hover:scale-105 transition duration-200">
                <img class="block w-full h-full rounded-full" src={avatarImg} alt="">
            </figure>
            <article class="overflow-hidden group-hover:block relative">
                <p class="text-center font-extralight py-3 absolute">Log In</p>
            </article>
        </li>
    </ul>
</nav>


