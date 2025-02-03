<script>
    import { afterUpdate, onMount } from "svelte"
    import { User } from "../Stores/UserStore"
    import { Link, navigate } from "svelte-routing"
    import { productPkg } from "../Stores/ProductStore"

    export let discount
    export let myProduct 

    afterUpdate(() => {
        discount(myProduct)
    })

    onMount(() => {
        if (!myProduct) {
            navigate("/", {replace: true, preserveScroll: true})
        }
    })
</script>

<article class="relative ml-3 flex p-2 overflow-hidden">
    {#if myProduct}
    <div class="relative flex flex-col justify-center gap-y-6 gap-x-6 lg:flex-row lg:justify-start">
        {#each myProduct as prod}
        <figure class="basis-[60%] rounded-lg border w-[60vw] h-[70vh]">
            <img class="block w-full h-full rounded-lg" src={prod.photo} alt="">
        </figure>
        <button  class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl active:bg-slate-500/50 transition duration-150 peer">
            <img class="w-[90%] h-[90%]" src={$productPkg.includes(myProduct) ? prod.favIcon : prod.unFavIcon} alt="">
        </button>
        <div class="basis-[40%] flex flex-col gap-y-5">
            <h2 class="text-lg">{prod.name}</h2>
        {#if $User}
            <div class="w-12 h-10 p-2 rounded-2xl bg-gradient-to-r from-red-500/60 to-orange-500/60 cursor-pointer lg:w-16 lg:h-12">
                <h3 class="text-lg md:text-2xl">${prod.discountedPrice}</h3>
            </div>
        {:else}
            <h3 class="text-lg md:text-2xl">${prod.price}</h3>
            <Link to="/Login">
                <div class="relative  cursor-pointer w-32 p-2 rounded-lg bg-red-300/40 animFadeRight hover:bg-orange-300/40 group">
                    <p class="text-[12px] z-10">Join SSclub or log in and save 15%</p>
                </div>
            </Link>
        {/if}
        </div>
        {/each}
    </div>
    <button>        
    </button>
    {/if}   
</article>