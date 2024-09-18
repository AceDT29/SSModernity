<script>
  import { createEventDispatcher } from "svelte"
  import { onMount } from "svelte"
  import avatarImg from "../assets/avatar.png"
  import sunIcon from "../assets/sun-regular.svg"
  import moonIcon from "../assets/moon-regular.svg"
  import homeLightIcon from "../assets/house-light.svg"
  import homeDarkIcon from "../assets/house-dark.svg"
  import messengerLightIcon from "../assets/messenger-light.svg"
  import messengerDarkIcon from "../assets/messenger-dark.svg"
  import wishListLightIcon from "../assets/wishList-light.svg"
  import wishListDarkIcon from "../assets/wishList-dark.svg"
 
  export let checkPlease 
  const dispatch = createEventDispatcher()
  let isDarkMode = false
  let sideNode

  function mobileSideBar() {
    if(window.innerWidth < 768) {
        console.log("Se ha llamado al evento")
        sideNode.classList.add("SideRezise")
    } else {
        sideNode.classList.remove("SideRezise")
    }
  }
  
  function enableDark(){
     isDarkMode = !isDarkMode
     dispatch('ChangeMode', { isDarkMode })
  }

  onMount(() => {
    mobileSideBar()
    addEventListener("resize", mobileSideBar)

    return () => {
      window.removeEventListener("resize", mobileSideBar)
    }
  })

</script>


<div class="sticky inset-0 top-28 z-50 w-16 h-[340px] p-2 border-r bg-transparent rounded-lg cursor-pointer transition-all duration-200 group hover:w-36 drop-shadow-2xl shadow-lg lg:w-20 md:sticky" bind:this={sideNode}>
    <ul class="flex flex-col p-0 space-y-4 md:ml-2">
        <li class="SideLiConfig">
            <button class="SideIconsConfig" on:click={enableDark}>
                <img class="w-full h-full" src={isDarkMode ? moonIcon : sunIcon} alt="Light/Dark">
            </button>
            <article class="SideArtConfig">
                <p class="SideTextConfig whitespace-nowrap" id="AccText">{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
            </article>
        </li>
        <li class="SideLiConfig">
            <a class="SideIconsConfig" href=".">
                <img class="w-full h-full" src={isDarkMode ? homeDarkIcon : homeLightIcon} alt="">
            </a>
            <article class="SideArtConfig">
                <p class="SideTextConfig">Home</p>
            </article>
        </li>
        <li class="SideLiConfig">
            <a class="SideIconsConfig" href=".">
                <img class="w-full h-full" src={isDarkMode ? messengerDarkIcon : messengerLightIcon} alt="">
            </a>
            <article class="SideArtConfig">
                <p class="SideTextConfig">Messages</p>
            </article>
        </li>
        <li class="SideLiConfig">
            <label for="checkWish" class="SideIconsConfig">
                <input class="hidden" type="checkbox" id="checkWish" bind:checked={checkPlease}>
                <img class="w-full h-full" src={isDarkMode ? wishListDarkIcon : wishListLightIcon}  alt="">
            </label>
            <article class="SideArtConfig">
                <p class="SideTextConfig" translate="no">Wish list</p>
            </article>
        </li>
        <li class="SideLiConfig">
            <figure class="w-[52px] h-[52px] p-2 rounded-full hover:scale-105 transition duration-200">
                <img class="block w-full h-full rounded-full" src={avatarImg} alt="">
            </figure>
            <article class="SideArtConfig">
                <p class="SideTextConfig">Log In</p>
            </article>
        </li>
    </ul>
    <slot/>
</div>



