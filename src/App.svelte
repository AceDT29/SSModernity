<script>
  import { onMount } from "svelte"
  import SideNav from "./lib/SideBar.svelte"
  import Banner from "./lib/Banner.svelte"
  import HomeSec from "./lib/Home.svelte"
  import WishComp from "./lib/Wishlist.svelte"
  import upButton from "./assets/UpArrow.svg"

  let upBtn
  let checkFromNav = false
  let productPkg = []

  function enableMode() {
    document.body.classList.toggle("darkMode")
  }

  function getScroll() {
    let valueScroll = document.body.scrollTop || document.documentElement.scrollTop
    if (valueScroll > 500 && upBtn.classList.contains("hiddenClass")) {
        upBtn.classList.remove("hiddenClass")
      } else if (valueScroll === 0 && !upBtn.classList.contains("hiddenClass")) {
         upBtn.classList.add("hiddenClass")
      }
    return valueScroll
  }

  function backToTop(){
    const currentValue = getScroll()
    if (currentValue > 0) {
      requestAnimationFrame(backToTop)
      scrollTo(0, currentValue - (currentValue / 10))
    }
  }

  onMount(() => {
    addEventListener("scroll", getScroll)
  })
</script>

<body class="relative">
  <main>
    <header class="mb-10 p-0">
      <Banner>
        <WishComp bind:theWish={productPkg} bind:checkValue={checkFromNav} />
      </Banner>
    </header>
    <article class="flex md:gap-8 lg:gap-x-16">
      <SideNav bind:checkPlease={checkFromNav} on:ChangeMode={enableMode}>
        <button class="hiddenClass SpecialButtons" bind:this={upBtn} on:click={backToTop}>
          <img class="w-full h-full block" src={upButton} alt="Volver al inicio">
        </button>
      </SideNav>
      <HomeSec bind:myWish={productPkg}/>
    </article>
    <footer class="w-full h-[60vh] border drop-shadow-2xl p-10">
        <div class="flex flex-col items-center gap-3">
          <h1 class="font-extrabold text-4xl"  translate="no">SS Modernity</h1>
          <p class="text-sm" translate="no">Your way, your style</p>
        </div> 
    </footer>
  </main> 
</body>

 


