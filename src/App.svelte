<script>
  import { onMount } from "svelte";
  import { productPkg } from "./Stores/ProductStore";
  import { User } from "./Stores/UserStore";
  import { Stock } from "./Stores/stockSearchStore";
  import { auth, provider } from "./firebase/firebaseConfig";
  import {
    signOut,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { Router, Route, navigate } from "svelte-routing";
  import { svgIcons } from "./Imports/images.d.js";
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

  class Items {
    static userDiscount = 15;

    constructor(name, photo, price, size, tag, colors) {
      this.name = name;
      this.id = name;
      this.photo = photo;
      this.price = price;
      this.size = size;
      this.tag = tag;
      this.discounted = false;
      this.discountedPrice = price;
      this.favIcon = svgIcons.fav;
      this.unFavIcon = svgIcons.unFav;
      this.colors = colors;
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
        error
      );
    }
  }

  $: localStorage.setItem("products", JSON.stringify($productPkg));

  function discountedStateChecker(arr) {
    if ($User) {
      arr.forEach((obj) => {
        Items.setProductDiscount(obj);
      });
      return;
    }
  }

  function getUserConfig(configValue) {
    if (configValue) {
      try {
        const parsedValue = JSON.parse(configValue);
        return parsedValue;
      } catch (error) {
        console.error("No se pudo recuperar tu configuracion", error);
      }
    }
  }

  function getScroll() {
    const scrollValue =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollValue > 900) {
      btnScrollState = true;
    }
    return scrollValue;
  }

  const navWithScroll = (target, scrollState, tag) => {
    const currentScroll = getScroll();
    scrollState = true;
    if (scrollState && target !== currentScroll) {
      smoothScrollTo(target, 600);
      navigate(`${tag}`, { replace: true, preserveScroll: true });
    } else {
      scrollState = false;
    }
  };

  const smoothScrollTo = (target, duration) => {
    const start = window.scrollY;
    const change = target - start;
    const startTime = performance.now();
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };
      const position = start + change * easeInOutQuad(progress);
      window.scrollTo(0, position);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  };

  const backToTop = () => {
    const currentValue = getScroll();
    if (currentValue > 0) {
      requestAnimationFrame(backToTop);
      scrollTo(0, currentValue - currentValue / 10);
    }
  };

  const handleNavi = (target) => {
    navigate(`${target}`, { replace: true, preserveScroll: true });
  };

  const validateFields = (inputEmail, inputPass) => {
    const patternValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let confirmValue = false;
    let emailValue = inputEmail.value;
    let passValue = inputPass.value;

    if (patternValid.test(emailValue.trim())) {
      inputEmail.style.borderColor = "green";
    } else {
      inputEmail.style.borderColor = "red";
    }

    if (passValue.trim().length < 8) {
      inputPass.style.borderColor = "red";
      inputPass.nextElementSibling.textContent = "The password is too short";
    } else {
      inputPass.style.borderColor = "green";
      inputPass.nextElementSibling.textContent = "";
    }
    return (confirmValue =
      patternValid.test(emailValue) && passValue.length >= 8);
  };

  const googleProviderHandler = async (callback) => {
    try {
      const response = await signInWithPopup(auth, provider);
      User.addUser(response.user);
      navigate("/", { replace: true, preserveScroll: true });
    } catch (error) {
      callback(error.code)
    }
  };

  const enableDark = (value) => {
    return localStorage.setItem("mode", JSON.stringify(value));
  };

  const sessionOut = () => {
    signOut(auth).then(() => {
      User.addUser(null);
      navigate("/Login", { replace: true, preserveScroll: true });
    });
  };

  const displayLargeView = (item) => {
    Stock.findProd(item);
    navigate(`/Product/${item.name}`, { replace: true, preserveScroll: true });
  };

  onMount(async () => {
    await User.currentUser();
    addEventListener("scroll", getScroll);
  });
</script>

<body class={ isDarkMode ? 'darkMode' : '' }>
  <Router {url}>
    <Route path="*">
      <NotFound navTo={handleNavi} />
    </Route>
    <main class="">
      <header class="">
        <Banner navTo={navWithScroll} mode={isDarkMode}>
          <Categories navTo={navWithScroll} />
        </Banner>
      </header>
      <article class="relative">
        <WishComp
          user={$User}
          prodList={$productPkg}
          bind:checkValue={checkFromNav}
          prodListMethods={productPkg}
          discount={discountedStateChecker}
          prodView={displayLargeView}
        />
      </article>
      <section class="flex py-8 md:gap-8 lg:gap-x-16 flex-grow">
        <SideNav
          user={$User}
          bind:checkPlease={checkFromNav}
          getConfig={getUserConfig}
          switchMode={enableDark}
          bind:darkMode={isDarkMode}
        >
          <button
            class={`${btnScrollState ? "SpecialButtons" : "hidden"}`}
            bind:this={upBtn}
            on:click={backToTop}
          >
            <img
              class="w-full h-full block"
              src={svgIcons.upButton}
              alt="Volver al inicio"
            />
          </button>
        </SideNav>
        <Route path="/Login">
          <Login
            user={$User}
            {auth}
            signInUser={signInWithEmailAndPassword}
            userMethods={User}
            signInWithGoogle={googleProviderHandler}
            validFunc={validateFields}
            navTo={handleNavi}
          />
        </Route>
        <Route path="/SignUp">
          <SignUp
            user={$User}
            {auth}
            createUser={createUserWithEmailAndPassword}
            userMethods={User}
            signInWithGoogle={googleProviderHandler}
            validFunc={validateFields}
            navTo={handleNavi}
          />
        </Route>
        <Route path="/Profile">
          <MyProfile
            user={$User}
            darkMode={isDarkMode}
            userMethods={User}
            getConfig={getUserConfig}
            signOutSession={sessionOut}
            navTo={handleNavi}
          />
        </Route>
        <Route path="/Product/:id">
          <Product
            allProds={$Stock.allProducts}
            filterProds={$Stock.filteredProducts}
            user={$User}
            prodList={productPkg}
            discount={discountedStateChecker}
            explorerProds={displayLargeView}
            navTo={handleNavi}
          />
        </Route>
        <Route path="/">
          <HomeSec
            user={$User}
            prodList={productPkg}
            newStock={Stock}
            discount={discountedStateChecker}
            displayProd={displayLargeView}
            ItemsClass={Items}
          />
        </Route>
        <Route path="/Search/:id" let:params>
          <SearchResult
            filterProds={$Stock.filteredProducts}
            user={$User}
            prodList={productPkg}
            tag={params.id}
            stockMethods={Stock}
            displayProd={displayLargeView}
            navTo={handleNavi}
          />
        </Route>
      </section>
      <footer class="w-full h-auto mt-20 border shadow-2xl drop p-10">
        <div class="flex flex-col items-center gap-3 font-lobster">
          <h1 class="font-extrabold text-4xl" translate="no">SS Modernity</h1>
          <p class="text-sm" translate="no">Your way, your style</p>
        </div>
      </footer>
    </main>
  </Router>
</body>
