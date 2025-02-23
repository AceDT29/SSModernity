<script>
    import { productPkg } from "../Stores/ProductStore"
    import { User } from "../Stores/UserStore"
    import { navigate } from "svelte-routing"
    import { beforeUpdate } from "svelte"
    import { svgIcons, productImgs } from "../Imports/images";
    
    export let ItemsClass
    export let discount
    export let itemSelected
    const products = []

    let modernMaleOut = new ItemsClass ("Modern Outfit Male", productImgs.Img1, 55, "M", [])
    let summerWomenOut = new ItemsClass ("Summer Outfit Women", productImgs.Img6, 29.99, "S")
    let ofWhite = new ItemsClass ("OfWhite Headsets", productImgs.Img4, 25, "Universal")
    let casualOut = new ItemsClass ("Casual Outfit for Men", productImgs.Img2, 49.99, "L")
    let sportOut = new ItemsClass ("Sporty outfit with accessories", productImgs.Img3, 35, "L  and M")
    let grungeOut = new ItemsClass ("Grunge Outfit For Girl", productImgs.Img5, 20, "S, L  and M",)
    let beachAcc = new ItemsClass ("Beach accessories for women", productImgs.Img7, 19.99, "Universal")
    let girlSport = new ItemsClass ("Sporty Oufit for Women", productImgs.Img8, 29.99, "S")
    let chicOut = new ItemsClass ("Fall outfit for a girl", productImgs.Img9, 49.99, "S")

    products.push(modernMaleOut, summerWomenOut, casualOut, ofWhite, sportOut, grungeOut, beachAcc, girlSport, chicOut)

    function displayLargeView(item) {
        itemSelected = [item]
        navigate("/Product", {replace: true, preserveScroll: true})
    }

    beforeUpdate(() => {
        discount(products)
    })
</script>

<section class="basis-[80%] relative bg-transparent w-[60%] h-auto p-4 border-r border-b rounded-md lg:mb-60 lg:w-[80%] transition-all drop-shadow-lg shadow-lg">
    <h2 class="text-lg mb-2">Our Products:</h2>
    <div class="HomeDivSet">
    {#each products as prod }
        <figure class="HomefigSet group" on:dblclick={() => {displayLargeView(prod)}}>
            <img class="HomeImgSet" src={prod.photo} loading="lazy" alt="">
            <button on:click={() => productPkg.add(prod)}  class="absolute z-10 top-3 left-3 flex justify-center items-center w-10 h-10 p-1 bg-slate-200/50 border rounded-2xl active:bg-slate-500/50 transition duration-150 peer">
                <img class="w-[90%] h-[90%]" src={$productPkg.includes(prod) ? prod.favIcon : prod.unFavIcon} alt="">
            </button>
            <figure class="HomeHiddenFlag">
                <img class={$User ? 'globalImgRules' : 'hidden'} src={svgIcons.offSale} alt="">
            </figure>
            <div class="HomeHiddenInfo group-hover:opacity-100">
                <h2 class="text-base">{prod.name}</h2>
                <p class="text-sm">Size: {prod.size}</p>
            {#if $User}
                <div class="flex gap-x-2 lg:gap-x-4">
                    <h3 class="text-base line-through whitespace-nowrap lg:text-lg">Before ${prod.price}</h3>
                    <h3 class="text-base lg:text-lg whitespace-nowrap text-red-500/85">Now ${prod.discountedPrice}</h3>
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


