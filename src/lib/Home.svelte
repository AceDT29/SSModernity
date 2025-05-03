<script>
    import { beforeUpdate, onMount } from "svelte"
    import { svgIcons, productImgs } from "../Imports/images.d.js";
    import { colorsPalette } from "../Imports/Palette.d.js";

    export let user
    export let prodList
    export let ItemsClass
    export let newStock
    export let discount
    export let displayProd
    const products = []
    let wishState = []

    let modernMaleOut = new ItemsClass ("Modern Outfit Male", productImgs.Img1, 55, "M", "Casual", colorsPalette.modernMaleOut)
    let summerWomenOut = new ItemsClass ("Summer Outfit Women", productImgs.Img6, 29.99, "S", "Summer", colorsPalette.summerWomenOut)
    let ofWhite = new ItemsClass ("OfWhite Headsets", productImgs.Img4, 25, "Universal", "Casual", colorsPalette.ofWhite)
    let casualOut = new ItemsClass ("Casual Outfit for Men", productImgs.Img2, 49.99, "L", "Casual", colorsPalette.casualOut)
    let sportOut = new ItemsClass ("Sporty outfit with accessories", productImgs.Img3, 35, "L  and M", "Fit", colorsPalette.sportOut)
    let grungeOut = new ItemsClass ("Grunge Outfit For Girl", productImgs.Img5, 20, "S, L  and M", "Casual", colorsPalette.grungeOut)
    let beachAcc = new ItemsClass ("Beach accessories for women", productImgs.Img7, 19.99, "Universal", "Summer", colorsPalette.beachAcc)
    let girlSport = new ItemsClass ("Sporty Oufit for Women", productImgs.Img8, 29.99, "S", "Fit", colorsPalette.girlSport)
    let chicOut = new ItemsClass ("Fall outfit for a girl", productImgs.Img9, 49.99, "S", "Casual", colorsPalette.chicOut)

    products.push(modernMaleOut, summerWomenOut, casualOut, ofWhite, sportOut, grungeOut, beachAcc, girlSport, chicOut)
    newStock.add(products)
   
    const unsubscribe = prodList.subscribe(value => {
        wishState = value; 
    });

    beforeUpdate(() => {
        if (user) {
            discount(products)
        }
    })

    onMount(() => {
        return () => unsubscribe();
    });
</script>

<section class="HomeSection">
    <h2 class="text-lg font-lobster mb-2">Our Products:</h2>
    <div class="HomeDivSet">
    {#each products as prod (prod.id)}
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


