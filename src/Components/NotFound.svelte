<script>
    import { onMount } from "svelte"
    import { svgIcons } from "../Imports/images.d.js";
    
    export let navTo

    function backToHome() {
        setTimeout(() => {
            navTo("/")
        }, 8000)
    }

    onMount(() => {
        backToHome()
    })
</script>

<section class="fixed inset-42 flex flex-col items-center w-full h-full p-4 bg-slate-50 backdrop-blur-sm z-50">
    <div class="flex flex-col items-center my-auto">
        <figure class="w-72 h-72">
            <img class="globalImgs" src={svgIcons.ghost} alt="">
        </figure>
        <h2 class="text-black text-3xl font-lobster font-bold">Ups...</h2>
        <h3 class="text-black text-lg">Parece que lo que buscas no esta aqui</h3>
        <p class="text-black">Volviendo a Home</p>
        <div class="animBounce flex justify-around w-24 mt-4">
            <span class="w-4 h-4 rounded-full bg-slate-500/80 border"></span>
            <span class="w-4 h-4 rounded-full bg-slate-500/80 border"></span>
            <span class="w-4 h-4 rounded-full bg-slate-500/80 border"></span>
        </div>
    </div>
    <div class="relative self-start px-2">
        <h1 class="font-extrabold text-black text-2xl font-lobster md:text-4xl">SS Modernity</h1>
    </div>
</section>