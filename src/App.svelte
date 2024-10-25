<script>
  import { onMount } from "svelte"
  import { productPkg } from "./Stores/ProductStore"
  import { Router, Route } from "svelte-routing"
  import SideNav from "./lib/SideBar.svelte"
  import Banner from "./lib/Banner.svelte"
  import HomeSec from "./lib/Home.svelte"
  import WishComp from "./lib/Wishlist.svelte"
  import Login from "./lib/Login.svelte"
  import MyProfile from "./lib/MyProfile.svelte"
  import SignUp from "./lib/Registrer.svelte"
  import upButton from "./assets/UpArrow.svg"
  
  const storedProducts = localStorage.getItem("products")
  let upBtn
  let checkFromNav = false
  export let url = ""

  if (storedProducts) {
    try {
      const parsedProducts = JSON.parse(storedProducts)
      productPkg.local(parsedProducts)
    } catch (error) {
      console.error("Error al analizar los productos desde localStorage:", error)
    }
  }

  $: localStorage.setItem("products", JSON.stringify($productPkg))
   
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
  <Router {url}>
    <main class="">
      <header class="mb-10 p-0">
        <Banner>
          <WishComp bind:checkValue={checkFromNav} />
        </Banner>
      </header>
      <article class="flex md:gap-8 lg:gap-x-16 flex-grow">
        <SideNav bind:checkPlease={checkFromNav}>
          <button class="hiddenClass SpecialButtons" bind:this={upBtn} on:click={backToTop}>
            <img class="w-full h-full block" src={upButton} alt="Volver al inicio">
          </button>
        </SideNav>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>
        <Route path="/Profile">
          <MyProfile />
        </Route>
        <Route path="/">
          <HomeSec/>
        </Route> 
      </article>
      <footer class="w-full h-auto mt-14 border drop-shadow-2xl p-10">
          <div class="flex flex-col items-center gap-3">
            <h1 class="font-extrabold text-4xl"  translate="no">SS Modernity</h1>
            <p class="text-sm" translate="no">Your way, your style</p>
          </div> 
      </footer>
    </main> 
  </Router>
</body>

 


