<script>
    import { productPkg } from "../Stores/ProductStore"
    import { User } from "../Stores/UserStore"
    import { afterUpdate } from "svelte"
    import closeIcon from "../assets/CloseIcon.svg"
    import garbage from "../assets/garbage.svg"

    export let checkValue
    export let ItemsClass 
    
    const prodDel = (name) => {
        productPkg.delete(name)
    }

    function discountedStateChecker(){
        if($User && $productPkg) {
            $productPkg.forEach((obj) => {
                ItemsClass.setProductDiscount(obj)
            })
            return
        }
    }

    afterUpdate(() => {
        discountedStateChecker()
    })
</script>

{#if checkValue}
    <div class="absolute overflow-hidden left-[33%] z-20 w-60 h-auto rounded-md md:left-[60%] md:w-80 lg:left-[69%] lg:w-96">
        <div class=" backdrop-filter backdrop-blur-xl border-b border-r rounded-md p-2 shadow-md lg:p-4">
            <label for="CloseBtn" class="relative left-[88%] bottom-6 w-10 h-10 z-10 p-2 cursor-pointer">
                <input type="checkbox" class="hidden" id="CloseBtn" bind:checked={checkValue}>
                <img class="w-8 h-8 block" src={closeIcon} alt="">
            </label>
            <h2 class="relative text-lg bottom-20">Your WishList:</h2>
            {#each $productPkg as prod}
                <div class="flex relative bottom-8 h-36 gap-x-3 gap-y-3 items-start transition lg:w-full">
                    <figure class="w-44 h-32 cursor-pointer hover:scale-110 transition-all">
                        <img class="w-full h-full block rounded-sm" src={prod.photo} alt="">
                    </figure>
                    <div class="flex-col">
                        <p class="text-sm md:text-base lg:text-base">{prod.name}</p>
                    {#if $User}
                        <h3 class="text-base text-gray-500 lg:text-lg line-through">Before {prod.price}$</h3>
                        <h3 class="text-base lg:text-lg">Now {prod.discountedPrice}$</h3>
                    {:else}
                        <h3 class="text-base lg:text-lg">{prod.price}$</h3>
                    {/if}
                        <button class="w-10 h-10 p-2 z-10 transition-all active:scale-90 lg:p-1" on:click={() => prodDel(prod.name)}>
                            <img class="w-full h-full block" src={garbage} alt="Delete product">
                        </button>
                    </div>
                </div>
                {:else}
                <p class="relative text-lg bottom-14 lg:bottom-8">You're not have any product yet</p>
            {/each}
        </div>  
    </div>
{/if}