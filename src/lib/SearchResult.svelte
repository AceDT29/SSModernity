<script>
    import { svgIcons } from "../Imports/images.d.js";
    import { onMount } from "svelte";

    export let filterProds
    export let stockMethods
    export let user 
    export let prodList
    export let tag
    export let displayProd
    export let navTo

    let wishState = []

    const unsubscribe = prodList.subscribe(value => {
        wishState = value;
    });

    $: if (tag) {
        stockMethods.search(tag);
    } else {
        navTo("/")
    }

    onMount(() => {
        if (filterProds.length == 0) {
            navTo("/")
        }

        return () => unsubscribe();
    })
</script>

<section class="HomeSection">
    <h2 class="text-lg font-lobster mb-2">{tag} catalog:</h2>
    <div class="HomeDivSet">
    {#each filterProds as prod }
        <figure class="HomefigSet group animFadeDown" on:dblclick={() => {displayProd(prod)}}>
            <img class="globalImgs" src={prod.photo} loading="lazy" alt="">
            <button on:click={() => prodList.add(prod)} class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl active:scale-75 transition duration-150 peer">
                <img class="w-[90%] h-[90%]" src={wishState.some(item => item.id === prod.id) ? prod.favIcon : prod.unFavIcon} alt="">
            </button>
            <figure class="HomeHiddenFlag">
                <img class={user ? 'globalImgs' : 'hidden'} src={svgIcons.offSale} alt="">
            </figure>
            <div class="HomeHiddenInfo group-hover:opacity-100">
                <figure class="w-[60%] h-[60%]">
                    <img class="globalImgs" src={svgIcons.hiddenInfo} alt="">
                </figure>
            </div>
            <div class="flex justify-between gap-x-2 p-1">
                <h3 class="font-light text-wrap text-start lg:text-lg">{prod.name}</h3>
                <div class="flex flex-col gap-y-1">
                {#if user}
                    <h3 class=" text-slate-400/80 line-through lg:text-lg">${prod.price}</h3>
                    <h3 class="font-semibold lg:text-lg">${prod.discountedPrice}</h3>
                {:else}
                    <h3 class="font-semibold lg:text-lg">${prod.price}</h3>
                {/if}
                </div>
            </div>
        </figure>
    {/each}
    </div>
</section>