<script>
    import { onMount } from "svelte"
    import { svgIcons, productImgs } from "../Imports/images.d.js";
    import { colorsPalette } from "../Imports/Palette.d.js";

    export let user;
    export let ItemsClass;
    export let newStock;
    export let wishlistRef;
    export let discount;
    export let displayProd;
    export let darkMode;
    const instanceProds = [];
    let products = [];
    let wishState = [];
    let searchEntry = "";
    let prodAction = "ADD";

    let modernMaleOut = new ItemsClass ("Modern Outfit Male", productImgs.Img1, 55, "M", "Casual", colorsPalette.modernMaleOut)
    let summerWomenOut = new ItemsClass ("Summer Outfit Women", productImgs.Img6, 29.99, "S", "Summer", colorsPalette.summerWomenOut)
    let ofWhite = new ItemsClass ("OfWhite Headsets", productImgs.Img4, 25, "Universal", "Casual", colorsPalette.ofWhite)
    let casualOut = new ItemsClass ("Casual Outfit for Men", productImgs.Img2, 49.99, "L", "Casual", colorsPalette.casualOut)
    let sportOut = new ItemsClass ("Sporty outfit with accessories", productImgs.Img3, 35, "L  and M", "Fit", colorsPalette.sportOut)
    let grungeOut = new ItemsClass ("Grunge Outfit For Girl", productImgs.Img5, 20, "S, L  and M", "Casual", colorsPalette.grungeOut)
    let beachAcc = new ItemsClass ("Beach accessories for women", productImgs.Img7, 19.99, "Universal", "Summer", colorsPalette.beachAcc)
    let girlSport = new ItemsClass ("Sporty Oufit for Women", productImgs.Img8, 29.99, "S", "Fit", colorsPalette.girlSport)
    let chicOut = new ItemsClass ("Fall outfit for a girl", productImgs.Img9, 49.99, "S", "Casual", colorsPalette.chicOut)

    instanceProds.push(modernMaleOut, summerWomenOut, casualOut, ofWhite, sportOut, grungeOut, beachAcc, girlSport, chicOut)
    newStock.add(instanceProds)

    const unsubscribe = wishlistRef.subscribe(value => {
        wishState = value;
    });

    const stockUnsubscribe = newStock.subscribe(value => {
        products = value.filteredProducts;
    });

    onMount(() => {
        return () => {
            unsubscribe();
            stockUnsubscribe();
        };
    });

    $: if (user) {
        discount(products);
    };
</script>

<section class="HomeSection">
    <div class="w-full h-auto flex flex-col justify-center items-start my-1 gap-y-3">
        <nav class="w-56 h-auto p-2 flex bg-transparent shadow-md rounded-md gap-x-1">
            <input
                type="text"
                placeholder="Buscar producto..."
                maxlength="25"
                style=""
                class="w-44 h-10 focus:border-blue-400 bg-transparent border border-gray-300 rounded-md"
                bind:value={searchEntry}
                on:input={() => newStock.searchByName(searchEntry)}
            />
            <figure class="w-7 h-7 self-center">
                <img class="globalImgs" src={darkMode ? svgIcons.searchIconDark : svgIcons.searchIcon} alt="">
            </figure>
        </nav>
        <h2 class="text-lg font-lobster md:text-2xl">Our Products:</h2>
    </div>
    <div class="HomeDivSet">
    {#each products as prod (prod.id)}
        <figure class="HomefigSet group animFadeDown" on:dblclick={() => {displayProd(prod)}}>
            <img class="globalImgs" src={prod.photo} loading="lazy" alt="">
        {#if user}
            <button on:click={() => wishlistRef.add(prod, prodAction)} class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl active:scale-75 transition duration-150 peer">
                <img class="w-[90%] h-[90%]" src={wishState.some(item => item.id === prod.id) ? prod.favIcon : prod.unFavIcon} alt="">
            </button>
        {:else}
             <button on:click={() => wishlistRef.addWithoutUser(prod)} class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl active:scale-75 transition duration-150 peer">
                <img class="w-[90%] h-[90%]" src={wishState.some(item => item.id === prod.id) ? prod.favIcon : prod.unFavIcon} alt="">
             </button>
        {/if}
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


