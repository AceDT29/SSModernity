<script>
  import { onMount } from "svelte"
  import SideNav from "./lib/SideBar.svelte"
  import Banner from "./lib/Banner.svelte"
  import HomeSec from "./lib/Home.svelte"
  import upButton from "./assets/UpArrow.svg"

  let upBtn
  let checkFromNav

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

  function wishToSon(event){
    checkFromNav = event.detail
  }
    
  onMount(() => {
    addEventListener("scroll", getScroll)
  })
</script>

<body class="">
  <main>
    <header class="mb-14 p-0">
      <Banner />
    </header>
    <article class="flex md:gap-8 lg:gap-x-16">
      <SideNav on:ChangeMode={enableMode} on:wishToFather={wishToSon}/>
      <HomeSec checkValue={checkFromNav}/>
      <button class="hiddenClass SpecialButtons" bind:this={upBtn} on:click={backToTop}>
        <img class="w-full h-full block" src={upButton} alt="Volver al inicio">
      </button>
    </article>
    <footer class="w-full h-[60vh] border drop-shadow-2xl p-10">
        <div class="flex flex-col items-center gap-3">
          <h1 class="font-extrabold text-4xl">SS Modernity</h1>
          <p class="text-sm">Your way, your style</p>
        </div> 
    </footer>
  </main> 
</body>

 


