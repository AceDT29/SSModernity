<script>
    import { onMount } from 'svelte'
    import imagenAni1 from "../assets/ImagenDinamica1.jpg"
    import imagenAni2 from "../assets/ImagenDinamica2.jpg"
    import imagenAni3 from "../assets/ImagenDinamica3.jpg"
    import imagenAni4 from "../assets/ImagenDinamica4.jpg"
    import bigSale from "../assets/BannerBeta.png"
    import MobileBan from "../assets/BannerMobile.png"
     
    let currentImage =  0
    let imgS = [imagenAni1, imagenAni2, imagenAni3, imagenAni4]
    let isMobile = false

    onMount(() => {
    setInterval(() => {
      currentImage = (currentImage + 1) % imgS.length
    }, 5000)
    })
  
</script>



<nav class="sticky inset-0 z-20 w-full h-20 px-5 py-2 backdrop-filter backdrop-blur-sm border-b drop-shadow-2xl shadow-md md:py-5 md:h-28">
  <div class="flex flex-col gap-2 items-center">
       <h1 class="font-extrabold text-2xl md:text-4xl">SS Modernity</h1>
       <p class="text-sm">Your way, your style</p>
  </div>   
</nav>
<figure class="relative inset-0 w-full mt-2 h-48 mb-8 shadow-md md:hidden">
  <div class="relative p-10 z-10 flex gap-2 flex-col justify-center items-center text-center">
      <p class="text-lg text-slate-50 drop-shadow-2xl">The best quality at the best price.</p>
      <h2 class="text-4xl text-slate-50 drop-shadow-2xl">Summer!</h2>
      <p class="text-2x1 text-yellow-300 drop-shadow-2xl">SUPER SALE</p>
  </div>
  <img class="absolute top-0 w-full h-full block" src={MobileBan} alt="">
</figure>
<div class="relative hidden h-[100vh] w-full py-1 px-4 bg-transparent md:block">
    {#each imgS as img, i}
      <figure class="absolute h-[95%] w-[95%] mt-4 ml-6 transition duration-300 transform opacity-0 rounded-sm mb-4 shadow-md {currentImage === i ? 'translate-x-0 opacity-100' : ''}">
            <img class="block w-full h-full object-cover" src={img} alt="">
      </figure>
    {/each}
</div>
<figure class="relative hidden w-full h-60 mt-4 mb-8 shadow-md lg:block">
  <div class="relative p-7 z-10 flex gap-4 flex-col justify-center items-center text-center">
      <p class="text-2xl text-red-400 drop-shadow-2xl">Up to 50% OFF</p>
      <h2 class="text-6xl text-cyan-400 drop-shadow-2xl">Summer!</h2>
      <p class="text-3xl text-red-500 drop-shadow-2xl">BIG SALE</p>
  </div>
  <img class="absolute top-0 w-full h-full block object-cover" src={bigSale} alt="">
</figure>



