<script>
    import { onMount } from 'svelte';
    import imagenAni1 from "../assets/ImagenDinamica1.jpg"
    import imagenAni2 from "../assets/ImagenDinamica2.jpg"
    import imagenAni3 from "../assets/ImagenDinamica3.jpg"
    import imagenAni4 from "../assets/ImagenDinamica4.jpg"
    import logo from "../assets/TheLogo.png"
     
    let currentImage =  0
    let imgS = [imagenAni1, imagenAni2, imagenAni3, imagenAni4]

    onMount(() => {
    setInterval(() => {
      currentImage = (currentImage + 1) % imgS.length;
    }, 5000);
    });
    
</script>

<header class="fixed z-50 w-full h-auto px-10 py-5 backdrop-filter backdrop-blur-sm border drop-shadow-2xl shadow-lg">
   <div class="flex flex-col gap-3">
        <h1 class="font-extrabold text-4xl">SS Modernity</h1>
        <p class="text-sm">Your way, your style</p>
   </div>   
</header>
<nav class="relative h-[100vh] w-full py-4 px-4 bg-transparent mb-32">
    {#each imgS as img, i}
      <figure class="absolute h-[95%] w-[95%] mt-10 ml-6 transition duration-300 transform opacity-0 rounded-sm drop-shadow-2xl {currentImage === i ? 'translate-x-0 opacity-100' : ''}">
            <img class="block w-full h-full object-cover" src={img} alt="">
      </figure>
    {/each}
</nav>