<script>
    import { beforeUpdate } from "svelte";
    import { svgIcons } from "../Imports/images";
    import { navigate } from "svelte-routing";
    import { User } from "../Stores/UserStore";
    import { productPkg } from "../Stores/ProductStore";
    import { Stock } from "../Stores/stockSearchStore";

    export let tag
    export let itemSelected


    function displayLargeView(item) {
        itemSelected = [item]
        navigate(`/Product/${item.name}`, {replace: true, preserveScroll: true})
    }

    $: if (tag) {
        Stock.search(tag);
    } else {
        navigate("/", {replace: true, preserveScroll: true})
    }

</script>

<section class="basis-[80%] relative bg-transparent w-[60%] h-auto p-4 border-r border-b rounded-md lg:w-[80%] transition-all drop-shadow-lg shadow-lg">
    <h2 class="text-lg mb-2">{tag} catalog:</h2>
    <div class="HomeDivSet">
    {#each $Stock.filteredProducts as prod }
        <figure class="HomefigSet group animFadeDown" on:dblclick={() => {displayLargeView(prod)}}>
            <img class="HomeImgSet" src={prod.photo} loading="lazy" alt="">
            <button on:click={() => productPkg.add(prod)}  class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl active:scale-75 transition duration-150 peer">
                <img class="w-[90%] h-[90%]" src={$productPkg.includes(prod) ? prod.favIcon : prod.unFavIcon} alt="">
            </button>
            <figure class="HomeHiddenFlag">
                <img class={$User ? 'globalImgRules' : 'hidden'} src={svgIcons.offSale} alt="">
            </figure>
            <div class="HomeHiddenInfo group-hover:opacity-100">
                <h2 class="text-base">{prod.name}</h2>
                <p class="text-sm">Size: {prod.size}</p>
            {#if $User}
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