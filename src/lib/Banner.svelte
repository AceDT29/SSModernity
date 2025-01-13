<script>
  import { User } from "../Stores/UserStore";
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import imagenAni1 from "../assets/ImagenDinamica1.jpg";
  import imagenAni2 from "../assets/ImagenDinamica2.jpg";
  import imagenAni3 from "../assets/ImagenDinamica3.jpg";
  import imagenAni4 from "../assets/ImagenDinamica4.jpg";
  import bigSale from "../assets/BannerBeta.png";
  import MobileBan from "../assets/BannerMobile.png";

  export let scrollHandler;
  let currentImage = 0;
  let imgS = [imagenAni1, imagenAni2, imagenAni3, imagenAni4];

  const goToSignUp = () => {
    const targetScroll = 900;
    const currentScroll = scrollHandler();
    const distance = targetScroll - currentScroll;
    if (currentScroll < targetScroll) {
      const steps = distance / 10;
      window.scrollTo(0, currentScroll + steps);
      requestAnimationFrame(goToSignUp);
    } else {
      return;
    }
  };

  const bannerAnim = () => {
    setInterval(() => {
      currentImage = (currentImage + 1) % imgS.length;
    }, 5000);
  }

  onMount(() => {
    bannerAnim()
    if (window.innerWidth > 768) {
      window.addEventListener("scroll", scrollHandler);
    }
  });
</script>

<nav
  class="sticky inset-0 z-30 w-full h-20 px-5 py-2 backdrop-filter backdrop-blur-sm border-b drop-shadow-2xl shadow-md md:py-5 md:h-28"
>
  <div class="flex flex-col gap-2 items-center">
    <h1 class="font-extrabold text-2xl md:text-4xl" translate="no">
      SS Modernity
    </h1>
    <p class="text-sm" translate="no">Your way, your style</p>
  </div>
</nav>
<figure class="BannerFigRules h-52 shadow-md md:hidden">
  <div
    class="relative p-10 z-10 flex gap-2 flex-col justify-center items-center text-center"
  >
    <p class="text-lg text-slate-50 drop-shadow-2xl">
      The best quality at the best price.
    </p>
    <h2 class="text-4xl text-slate-50 drop-shadow-2xl">Summer!</h2>
    <p class="text-2x1 text-yellow-300 drop-shadow-2xl">SUPER SALE</p>
  </div>
  <img class="BannerImgRules absolute top-0" src={MobileBan} alt="" />
</figure>
<section class="flex items-center gap-4 lg:flex-col">
  <div class="mt-4 w-[40%] hidden md:block lg:hidden">
    <figure
      class="relative w-full h-60 border-r border-b shadow-lg rounded-sm p-1"
    >
      <div
        class="w-[90%] h-[90%] flex flex-col gap-3 items-center rounded-sm mt-2 mx-auto p-4 shadow-lg bg-slate-400/60"
      >
        <h4 class="self-start text-2xl">Join the SS club</h4>
        <p class="">
          15% discount on our entire catalog, notification of new products in
          stock, and 5 gift coupons!
        </p>
        <button
          class="self-start w-16 h-10 active:scale-90 transition-all bg-red-400/60 rounded-md"
        >
          <p class="text-sm text-slate-50">Sign Up</p>
        </button>
      </div>
    </figure>
  </div>
  <div
    class="relative overflow-hidden transition duration-300 bg-transparent shadow-md md:w-[60%] md:h-60 md:block lg:w-full lg:h-[100vh] lg:block"
  >
    {#if !$User}
      <div
        class="hidden left-[70%] z-10 w-96 h-48 p-3 lg:absolute lg:block lg:top-[60%] rounded-md transition-all backdrop-filter backdrop-blur-lg border animFadeLeft animate-delay-1000 animate-ease-out"
      >
        <div class="flex flex-col items-start gap-y-3">
          <h4 class="self-start text-2xl">Join the SS club</h4>
          <p class="text-sm">
            15% discount on our entire catalog, notification of new products in
            stock, and 5 gift coupons!
          </p>
          <Link to="/SignUp">
            <button
              on:click={goToSignUp}
              class="self-start w-14 h-10 p-1 active:scale-90 transition-all bg-red-400/60 rounded-md"
            >
              <p class="text-sm text-slate-50">Sign Up</p>
            </button>
          </Link>
        </div>
      </div>
    {/if}
    {#each imgS as img, i}
      <figure
        class="absolute h-full w-full transition duration-300 transform opacity-0 rounded-md mb-4 shadow-md {currentImage ===
        i
          ? 'translate-x-0 opacity-100 animFadeRight'
          : ''}"
      >
        <img class="BannerImgRules animFadeLeft" src={img} alt="" />
      </figure>
    {/each}
  </div>
</section>
<figure class="BannerFigRules h-60 hidden mt-6 lg:block">
  <div class="BannerDivRules p-7 gap-4">
    <p class="text-2xl text-red-400 drop-shadow-2xl">Up to 15% OFF</p>
    <h2 class="text-6xl text-cyan-400 drop-shadow-2xl animPulse">Summer!</h2>
    <p class="text-3xl text-red-500 drop-shadow-2xl">BIG SALE</p>
  </div>
  <img class="BannerImgRules absolute top-0" src={bigSale} alt="" />
</figure>
<slot />
