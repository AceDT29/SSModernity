<script>
    import closeIcon from "../assets/CloseIcon.svg"
    import garbage from "../assets/garbage.svg"
    export let theWish = []
    export let checkValue  
    
</script>

{#if checkValue}
    <div class="absolute left-[40%] z-20 w-60 h-auto rounded-md md:left-[63%] md:w-72 lg:left-[69%] lg:w-96">
        <div class=" backdrop-filter backdrop-blur-xl border-b border-r rounded-md p-2 shadow-md lg:p-4">
            <button on:click={() => checkValue = false} class="relative top-1 left-72 z-10 lg:w-12 lg:h-12 lg:p-1">
                <img class="w-full h-full block" src={closeIcon} alt="">
            </button>
            <h2 class="relative bottom-8">Your WishList:</h2>
            {#each theWish as prod}
                <div class="flex w-[90%] h-36 gap-x-3 gap-y-3 items-start transition">
                    <figure class="w-36 h-32 my-3 cursor-pointer hover:scale-110 transition-all">
                        <img class="w-full h-full block rounded-sm" src={prod.photo} alt="">
                    </figure>
                    <div class="flex-col py-1">
                        <p class="">{prod.name}</p>
                        <h3 class="text-lg">{prod.price}$</h3>
                        <button class="w-10 h-10 p-2 z-10">
                            <img class="w-full h-full block" src={garbage} alt="Delete product">
                        </button>
                    </div>
                </div>
                {:else}
                <p class="relative bottom-7">You're not have any product yet</p>
            {/each}
        </div>  
    </div>
{/if}