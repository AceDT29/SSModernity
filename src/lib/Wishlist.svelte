<script>
    import { productPkg } from "../Stores/ProductStore"
    import { User } from "../Stores/UserStore"
    import { beforeUpdate } from "svelte"
    import { svgIcons } from "../Imports/images";

    export let checkValue
    export let discount 

    beforeUpdate(() => {
        discount($productPkg)
    })

</script>

{#if checkValue}
<div class="absolute overflow-auto right-0 border-l border-b rounded-md shadow-md z-20 w-[265px] h-auto md:w-80 lg:w-96">
    <div class="backdrop-filter backdrop-blur-2xl p-4 shadow-md animFadeLeft animate-duration-300">
        <label for="CloseBtn" class="absolute top-2 right-2 w-10 h-10 z-10 p-2 cursor-pointer">
            <input type="checkbox" class="hidden" id="CloseBtn" bind:checked={checkValue}>
            <img class="w-8 h-8 block" src={svgIcons.closeIcon} alt="">
        </label>
        <h2 class="text-lg mb-4">Your WishList:</h2>
        {#each $productPkg as prod}
            <div class="flex items-start gap-2 mb-4 transition lg:w-full animFadeLeft animate-duration-500">
                <figure class="w-44 h-32 cursor-pointer hover:scale-110 transition-all">
                    <img class="w-full h-full block rounded-sm object-cover" src={prod.photo} alt="">
                </figure>
                <div class="flex-col">
                    <p class="text-sm md:text-base lg:text-base">{prod.name}</p>
                    {#if $User}
                        <h3 class="text-base text-gray-500 lg:text-lg line-through">Before {prod.price}$</h3>
                        <h3 class="text-base lg:text-lg">Now {prod.discountedPrice}$</h3>
                    {:else}
                        <h3 class="text-base lg:text-lg">{prod.price}$</h3>
                    {/if}
                    <button class="w-7 h-7 z-10 transition-all active:scale-90 lg:h-10 lg:w-10 lg:p-1" on:click={() => productPkg.delete(prod.name)}>
                        <img class="w-full h-full block" src={svgIcons.garbage} alt="Delete product">
                    </button>
                </div>
            </div>
        {:else}
            <p class="text-lg">You're not have any product yet</p>
        {/each}
    </div>  
</div>
{/if}