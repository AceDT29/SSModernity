<script>
    import { beforeUpdate } from "svelte"
    import { svgIcons } from "../Imports/images.d.js"

    export let user
    export let wishlistValueRef
    export let checkValue
    export let discount
    export let wishlistRef
    export let prodView
    const prodAction = "DELETE";

    beforeUpdate(() => {
        discount(wishlistValueRef)
    })

</script>

{#if checkValue}
<div class="absolute overflow-auto right-0 border-l border-b rounded-md shadow-md z-20 w-[265px] h-auto md:w-80 lg:w-[412px]">
    <div class="backdrop-filter backdrop-blur-2xl p-2 shadow-md lg:p-4 animFadeLeft animate-duration-300">
        <label for="CloseBtn" class="absolute top-2 right-2 w-10 h-10 z-10 p-2 cursor-pointer">
            <input type="checkbox" class="hidden" id="CloseBtn" bind:checked={checkValue}>
            <img class="w-8 h-8 block" src={svgIcons.closeIcon} alt="">
        </label>
        <h2 class="text-lg font-lobster mb-4">Your WishList:</h2>
        {#each wishlistValueRef as prod}
            <div class="flex items-start gap-2 mb-4 transition lg:w-full animFadeLeft animate-duration-500">
                <button on:click={() => prodView(prod)} class=" active:scale-90 transition-all cursor-pointer">
                    <figure class="w-44 h-32 cursor-pointer hover:scale-110 transition-all">
                        <img class="globalImgs rounded-sm" src={prod.photo} alt="">
                    </figure>
                </button>
                <div class="flex flex-col gap-y-1">
                    <p class="text-sm md:text-base font-extralight md:font-light">{prod.name}</p>
                    {#if user}
                        <h3 class="text-sm text-gray-500 font-light lg:text-base line-through">Before {prod.price}$</h3>
                        <h3 class="text-base font-light">Now {prod.discountedPrice}$</h3>
                    {:else}
                        <h3 class="text-basee font-light">{prod.price}$</h3>
                    {/if}
                    <button on:click={() => wishlistRef.delete(prod, prodAction)} class="w-7 h-7 z-10 transition-all active:scale-90 lg:h-8 lg:w-8 lg:p-1">
                        <img class="globalImgs object-none" src={svgIcons.garbage} alt="Delete product">
                    </button>
                </div>
            </div>
        {:else}
            <p class="text-lg">You're not have any product yet</p>
        {/each}
    </div>  
</div>
{/if}