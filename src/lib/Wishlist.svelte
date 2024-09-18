<script>
    import closeIcon from "../assets/CloseIcon.svg"
    import garbage from "../assets/garbage.svg"
    export let theWish = []
    export let checkValue  
    
    const prodDel = (name) => {
        theWish = theWish.filter((item) => item.name !== name)
    }
</script>

{#if checkValue}
    <div class="absolute left-[35%] z-20 w-80 h-auto rounded-md md:left-[63%] md:w-72 lg:left-[69%] lg:w-96">
        <div class=" backdrop-filter backdrop-blur-xl border-b border-r rounded-md p-2 shadow-md lg:p-4">
            <label for="CloseBtn" class="relative w-10 h-10 left-72 z-10 p-1 cursor-pointer">
                <input type="checkbox" class="hidden" id="CloseBtn" bind:checked={checkValue}>
                <img class="w-10 h-10 block" src={closeIcon} alt="">
            </label>
            <h2 class="relative bottom-16">Your WishList:</h2>
            {#each theWish as prod}
                <div class="flex w-[90%] h-36 gap-x-3 gap-y-3 items-start transition">
                    <figure class="w-36 h-32 my-3 cursor-pointer hover:scale-110 transition-all">
                        <img class="w-full h-full block rounded-sm" src={prod.photo} alt="">
                    </figure>
                    <div class="flex-col py-1">
                        <p class="">{prod.name}</p>
                        <h3 class="text-lg">{prod.price}$</h3>
                        <button class="w-10 h-10 p-2 z-10" on:click={() => prodDel(prod.name)}>
                            <img class="w-full h-full block" src={garbage} alt="Delete product">
                        </button>
                    </div>
                </div>
                {:else}
                <p class="relative bottom-14">You're not have any product yet</p>
            {/each}
        </div>  
    </div>
{/if}