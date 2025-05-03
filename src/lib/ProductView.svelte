<script>
    import { onMount, beforeUpdate } from "svelte"

    export let user
    export let prodList
    export let explorerProds
    export let filterProds
    export let allProds
    export let discount
    export let navTo 

    let myProduct = []
    let interestedProds = []
    let wishState = []
    $: myProduct = filterProds.length > 0 ? filterProds : allProds

    const unsubscribe = prodList.subscribe(value => {
        wishState = value; 
    });
    
    function prodRecomendation(prodId) {
        const result = allProds.filter((item) => prodId !== item.id)
        return result
    }

    beforeUpdate(() => {
        discount(myProduct)
        if (myProduct.length == 0) {
            navTo("/")
        } else {
            interestedProds = prodRecomendation(myProduct[0].id)
        }
    })

    onMount(() => {
        return () => unsubscribe();
    })

</script>

 {#if myProduct.length}
    <article class="relative ml-3 flex-col p-2 mx-auto overflow-hidden">
        <div class="relative flex flex-col justify-center gap-y-6 gap-x-6 lg:flex-row lg:justify-start">
            {#each myProduct as prod (prod.id)}
            <figure class="basis-[60%] rounded-lg border w-[60vw] h-[70vh] animFadeDown">
                <img class="block w-full h-full rounded-lg" src={prod.photo} alt="">
            </figure>
            <button on:click={() => prodList.add(prod)} class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl hover:bg-slate-500/50 active:scale-75 transition duration-150 peer">
                <img class="w-[90%] h-[90%]" src={wishState.some(item => item.id === prod.id) ? prod.favIcon : prod.unFavIcon} alt="">
            </button>
            <div class="basis-[40%] flex flex-col gap-y-5">
                <h2 class="text-2xl animFadeRight animate-delay-100">{prod.name}</h2>
                <p class="text-base animFadeRight animate-delay-200">Size: {prod.size}</p>
                <p class="text-base animFadeRight animate-delay-300">Categorie: {prod.tag}</p>
                <div class="flex w-36 h-auto gap-x-2 animFadeRight animate-delay-500">
                    <span class="ProdSpanColors" style="background-color: {prod.colors.primary}"></span>
                    <span class="ProdSpanColors" style="background-color: {prod.colors.secundary}"></span>
                    <span class="ProdSpanColors" style="background-color: {prod.colors.accent}"></span>
                </div>
                <div class="w-12 h-10 p-2 cursor-pointer lg:w-16 lg:h-12 animFadeRight animate-delay-700">
                    <div class="flex flex-col gap-y-1">
                        {#if user}
                            <h3 class=" text-slate-400/80 text-nowrap line-through lg:text-2xl">Before ${prod.price}</h3>
                            <h3 class="text-nowrap  lg:text-2xl">Now for ${prod.discountedPrice}</h3>
                        {:else}
                            <h3 class="text-nowrap lg:text-2xl">For ${prod.price}</h3>
                        {/if}
                    </div>
                </div>
            </div>
            {/each}
        </div>
        <div class="p-2">
            <h2 class="text-lg font-lobster textShadow my-4 lg:text-2xl">Explore more options:</h2>
        </div>
        <section class="w-[90%] mt-2 rounded-lg p-2 shadow-md">
            <div class="flex overflow-x-auto w-full h-full justify-around"> 
                {#each interestedProds as item}
                    <button on:click={() => explorerProds(item)} class="w-96 h-auto min-h-52 flex flex-col items-start gap-2 cursor-pointer group">
                        <figure class="w-44 h-36  p-2 group-hover:scale-110 group-active:scale-90 transition-all md:w-64 md:h-52">
                            <img class="w-full h-full object-cover rounded-md" src={item.photo} alt={item.name}>
                        </figure>
                        <p class="text-center text-sm font-light ml-1">{item.name}</p>
                    </button>
                {/each}
            </div>
        </section>
    </article>
 {/if}