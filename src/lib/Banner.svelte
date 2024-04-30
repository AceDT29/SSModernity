<script>
    import { onMount } from 'svelte'
    import imagenAni1 from "../assets/ImagenDinamica1.jpg"
    import imagenAni2 from "../assets/ImagenDinamica2.jpg"
    import imagenAni3 from "../assets/ImagenDinamica3.jpg"
    import imagenAni4 from "../assets/ImagenDinamica4.jpg"
    import bigSale from "../assets/BannerBeta.png"
     
    let currentImage =  0
    let imgS = [imagenAni1, imagenAni2, imagenAni3, imagenAni4]
    let isMobile = false

    onMount(() => {
    setInterval(() => {
      currentImage = (currentImage + 1) % imgS.length
    }, 5000)
    })
  
</script>

<nav class="sticky inset-0 z-20 w-full h-28 px-5 py-5 backdrop-filter backdrop-blur-sm border-b drop-shadow-2xl shadow-lg ">
  <div class="flex flex-col gap-3 items-center">
       <h1 class="font-extrabold text-4xl">SS Modernity</h1>
       <p class="text-sm">Your way, your style</p>
  </div>   
</nav>
<div class="relative h-[100vh] w-full py-1 px-4 bg-transparent">
    {#each imgS as img, i}
      <figure class="absolute h-[95%] w-[95%] mt-10 ml-6 transition duration-300 transform opacity-0 rounded-sm mb-4 drop-shadow-2xl {currentImage === i ? 'translate-x-0 opacity-100' : ''}">
            <img class="block w-full h-full object-cover" src={img} alt="">
      </figure>
    {/each}
</div>
<figure class="relative hidden w-full h-60 mt-8 mb-8 lg:block">
  <div class="relative p-7 z-10 flex gap-4 flex-col justify-center items-center text-center">
      <p class="text-2xl text-red-400">Up to 50% OFF</p>
      <h2 class="text-6xl text-cyan-400">Summer!</h2>
      <p class="text-3xl text-red-500">BIG SALE</p>
  </div>
  <img class="absolute top-0 w-full h-full block object-cover" src={bigSale} alt="">
</figure>



