<script>
    import { onMount } from 'svelte'
    import imagenAni1 from "../assets/ImagenDinamica1.jpg"
    import imagenAni2 from "../assets/ImagenDinamica2.jpg"
    import imagenAni3 from "../assets/ImagenDinamica3.jpg"
    import imagenAni4 from "../assets/ImagenDinamica4.jpg"
    import logo from "../assets/TheLogo.png"
     
    let currentImage =  0
    let imgS = [imagenAni1, imagenAni2, imagenAni3, imagenAni4]

    onMount(() => {
    setInterval(() => {
      currentImage = (currentImage + 1) % imgS.length
    }, 5000)
    })
    
</script>

<nav class="fixed inset-0 z-20 w-full h-28 mx-auto py-5 backdrop-filter backdrop-blur-sm border-b drop-shadow-2xl shadow-lg ">
  <div class="flex flex-col gap-3 mx-auto">
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


