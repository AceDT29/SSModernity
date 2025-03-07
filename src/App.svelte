<script>
  import { onMount } from "svelte";
  import { productPkg } from "./Stores/ProductStore";
  import { Router, Route, navigate } from "svelte-routing";
  import { User } from "./Stores/UserStore";
  import { auth, provider } from "./firebase/firebaseConfig";
  import { signOut, signInWithPopup } from "firebase/auth";
  import { svgIcons } from "./Imports/images";
  import SideNav from "./lib/SideBar.svelte";
  import Banner from "./lib/Banner.svelte";
  import HomeSec from "./lib/Home.svelte";
  import WishComp from "./lib/Wishlist.svelte";
  import Login from "./lib/Login.svelte";
  import MyProfile from "./lib/MyProfile.svelte";
  import SignUp from "./lib/Registrer.svelte";
  import Product from "./lib/ProductView.svelte";
  import NotFound from "./lib/NotFound.svelte";
  import Categories from "./lib/Categories.svelte";
  import SearchResult from "./lib/SearchResult.svelte";
  
  export let url = "";
  const storedProducts = localStorage.getItem("products");
  let checkFromNav = false;
  let btnScrollState = false;
  let isDarkMode;
  let upBtn;
  let parsedProducts;
  let prodFromHome;
  let stockProds

  class Items {
    static userDiscount = 15;

    constructor(name, photo, price, size, tag) {
      this.name = name;
      this.photo = photo;
      this.price = price;
      this.size = size;
      this.tag = tag;
      this.discounted = false;
      this.discountedPrice = price;
      this.favIcon = svgIcons.fav;
      this.unFavIcon = svgIcons.unFav;
    }

    static setProductDiscount(item) {
      let discount = (item.price * this.userDiscount) / 100;
      let total = item.price - Math.round(discount);
      if (!item.discounted) {
        item.discountedPrice = total;
        item.discounted = true;
      } else {
        return;
      }
      return item.discountedPrice;
    }
  }
  
  if (storedProducts) {
    try {
      parsedProducts = JSON.parse(storedProducts);
      productPkg.local(parsedProducts);
    } catch (error) {
      console.error(
        "Error al analizar los productos desde localStorage:",
        error,
      );
    }
  }

   $: localStorage.setItem("products", JSON.stringify($productPkg));

  function discountedStateChecker(arr){
    if($User) {
      arr.forEach((obj) => {
        Items.setProductDiscount(obj)
      })
        return
    }
  }

  function getUserConfig(configValue) {
    if (configValue) {
      try {
        const parsedValue = JSON.parse(configValue);
        return parsedValue
      } catch (error) {
        console.error("No se pudo recuperar tu configuracion", error);
      }
    }
  }

  function getScroll() {
    const scrollValue = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollValue > 600) {
      btnScrollState = true;
    }
    return scrollValue;
  }

  function backToTop() {
    const currentValue = getScroll();
    if (currentValue > 0) {
      requestAnimationFrame(backToTop);
      scrollTo(0, currentValue - currentValue / 10);
    }
  }

  const validateFields = (inputEmail, inputPass) =>  {
    const patternValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let confirmValue = false
    let emailValue = inputEmail.value
    let passValue = inputPass.value

    if(patternValid.test(emailValue.trim())) {
      inputEmail.style.borderColor = "green"
    } else {
      inputEmail.style.borderColor = "red"
    }

    if(passValue.trim().length < 8) {
      inputPass.style.borderColor = "red"
      inputPass.nextElementSibling.textContent = "The password is too short"
    } else {
      inputPass.style.borderColor = "green"
      inputPass.nextElementSibling.textContent = ""
    }
    return confirmValue = patternValid.test(emailValue) && passValue.length >= 8
  }

  const googleProviderHandler = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      User.addUser(response.user)
      navigate("/", {replace: true, preserveScroll: true})
    } catch (error) {
      console.log(error)
    }
  }
   
  const enableDark = (value) => {
    if (value) {
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
    return localStorage.setItem("mode", JSON.stringify(value));
  }

  const sessionOut = () => {
    signOut(auth).then(() => {
      User.addUser(null)
      navigate("/Login", { replace: true, preserveScroll: true })
    })
  }

  onMount( async () => {
    await User.currentUser()
    addEventListener("scroll", getScroll);
  });
  
</script>

<body class="relative">
  <Router {url}>
    <Route path="*" component={NotFound} />
    <main class="">
      <header class="">
        <Banner scrollHandler={getScroll}>
          <Categories /> 
        </Banner>
      </header>
      <article class="relative">
        <WishComp discount={discountedStateChecker} bind:checkValue={checkFromNav} />
      </article>
        <section class="flex py-10 md:gap-8 lg:gap-x-16 flex-grow ">
          <SideNav bind:checkPlease={checkFromNav} getConfig={getUserConfig} switchMode={enableDark} darkMode={isDarkMode}>
            <button
              class={`${btnScrollState ? "SpecialButtons" : "hiddenClass"}`} bind:this={upBtn} on:click={backToTop}>
              <img
                class="w-full h-full block"
                src={svgIcons.upButton}
                alt="Volver al inicio"
              />
            </button>
          </SideNav>
          <Route path="/Login">
            <Login 
                signInWithGoogle={googleProviderHandler}
                validFunc={validateFields}
            />
          </Route>
          <Route path="/SignUp">
            <SignUp 
                signInWithGoogle={googleProviderHandler}
                validFunc={validateFields}
             />
          </Route>
          <Route path="/Profile">
            <MyProfile getConfig={getUserConfig} signOutSession={sessionOut} darkMode={isDarkMode}/>
          </Route>
          <Route path="/Product/:id">
            <Product discount={discountedStateChecker} myProduct={prodFromHome} />
          </Route>
          <Route path="/">
            <HomeSec bind:products={stockProds} discount={discountedStateChecker} ItemsClass={Items} bind:itemSelected={prodFromHome} /> 
          </Route>
          <Route path="/Search/:id" let:params>
            <SearchResult searchProds={stockProds} tag={params.id} bind:itemSelected={prodFromHome}/> 
          </Route>
        </section>
      <footer class="w-full h-auto mt-14 border drop-shadow-2xl p-10">
        <div class="flex flex-col items-center gap-3">
          <h1 class="font-extrabold text-4xl" translate="no">SS Modernity</h1>
          <p class="text-sm" translate="no">Your way, your style</p>
        </div>
      </footer>
    </main>
  </Router>
</body>
