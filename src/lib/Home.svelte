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

<section class="basis-[80%] relative bg-transparent w-[60%] h-auto p-4 border-r border-b rounded-md lg:w-[80%] transition-all drop-shadow-lg shadow-lg">
    <h2 class="text-lg font-lobster mb-2">Our Products:</h2>
    <div class="HomeDivSet">
    {#each products as prod (prod.id)}
        <figure class="HomefigSet group animFadeDown" on:dblclick={() => {displayProd(prod)}}>
            <img class="HomeImgSet" src={prod.photo} loading="lazy" alt="">
            <button on:click={() => prodList.add(prod)} class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl active:scale-75 transition duration-150 peer">
                <img class="w-[90%] h-[90%]" src={wishState.some(item => item.id === prod.id) ? prod.favIcon : prod.unFavIcon} alt="">
            </button>
            <figure class="HomeHiddenFlag">
                <img class={user ? 'globalImgRules' : 'hidden'} src={svgIcons.offSale} alt="">
            </figure>
            <div class="HomeHiddenInfo group-hover:opacity-100">
                <h2 class="text-sm font-light md:text-base md:font-normal">{prod.name}</h2>
                <p class="text-sm font-light md:text-base md:font-normal">Size: {prod.size}</p>
            {#if user}
                <div class="flex gap-x-2 lg:gap-x-4">
                    <h3 class="text-sm line-through whitespace-nowrap lg:text-lg">Before ${prod.price}</h3>
                    <h3 class="text-sm whitespace-nowrap textShadow text-red-500/85 lg:text-lg ">Now ${prod.discountedPrice}</h3>
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


