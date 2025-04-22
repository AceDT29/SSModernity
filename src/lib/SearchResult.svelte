<script>
    import { svgIcons } from "../Imports/images.d.js";
    import { onMount } from "svelte";

    export let filterProds
    export let search
    export let user 
    export let prodWish
    export let addProdWish
    export let tag
    export let displayProd
    export let navTo

    $: if (tag) {
        search(tag);
    } else {
        navTo("/")
    }

    onMount(() => {
        if (filterProds.length == 0) {
            navTo("/")
        }
    })
</script>

<section class="basis-[80%] relative bg-transparent w-[60%] h-auto p-4 border-r border-b rounded-md lg:w-[80%] transition-all drop-shadow-lg shadow-lg">
    <h2 class="text-lg font-lobster mb-2">{tag} catalog:</h2>
    <div class="HomeDivSet">
    {#each filterProds as prod }
        <figure class="HomefigSet group animFadeDown" on:dblclick={() => {displayProd(prod)}}>
            <img class="HomeImgSet" src={prod.photo} loading="lazy" alt="">
            <button on:click={() => addProdWish(prod)}  class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl active:scale-75 transition duration-150 peer">
                <img class="w-[90%] h-[90%]" src={prodWish.includes(prod) ? prod.favIcon : prod.unFavIcon} alt="">
            </button>
            <figure class="HomeHiddenFlag">
                <img class={user ? 'globalImgRules' : 'hidden'} src={svgIcons.offSale} alt="">
            </figure>
            <div class="HomeHiddenInfo group-hover:opacity-100">
                <h2 class="text-base">{prod.name}</h2>
                <p class="text-sm">Size: {prod.size}</p>
            {#if user}
                <div class="flex gap-x-2 lg:gap-x-4">
                    <h3 class="text-base line-through whitespace-nowrap lg:text-lg">Before ${prod.price}</h3>
                    <h3 class="text-base lg:text-lg whitespace-nowrap text-red-500/85">Now ${prod.discountedPrice}</h3>
                </div>
            {:else}
                <div>
                    <h3 class="text-base whitespace-nowrap lg:text-lg">Price ${prod.price}</h3>
                </div>
            {/if}
            </div>
        </figure>
    {/each}
    </div>
</section>