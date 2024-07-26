<script>
    import { writable } from 'svelte/store'
    import prodImg1 from "../assets/imagen1.jpg"
    import prodImg2 from "../assets/imagen2.jpg"
    import prodImg3 from "../assets/imagen3.jpg"
    import prodImg4 from "../assets/imagen4.jpg"
    import prodImg5 from "../assets/imagen5.jpg"
    import prodImg6 from "../assets/imagen6.jpg"
    import prodImg7 from "../assets/imagen7.jpg"
    import prodImg8 from "../assets/imagen8.jpg"
    import prodImg9 from "../assets/imagen9.jpg"
    import WishIcon from "../assets/WishListAddIcon.png"
    import closeIcon from "../assets/CloseIcon.svg"
    
    const wishProd = writable([])
    const productos = []
    export let checkValue
    
    class Items {
        constructor(name, photo, price, size) {
            this.name = name
            this.photo = photo
            this.price = price
            this.size = size
        }
    }

    let modernMaleOut = new Items ("Modern Outfit Male", prodImg1, 55, "M",)
    let summerWomenOut = new Items ("Summer Outfit Women", prodImg6, 29.99, "S",)
    let ofWhite = new Items ("OfWhite Headsets", prodImg4, 25, "Universal",)
    let casualOut = new Items ("Casual Outfit for Men", prodImg3, 49.99, "L",)
    let sportOut = new Items ("Sporty outfit with accessories", prodImg2, 35, "L  and M",)
    let grungeOut = new Items ("Grunge Outfit Unisex", prodImg5, 20, "S, L  and M",)
    let beachAcc = new Items ("Beach accessories for women", prodImg7, 19.99, "Universal")
    let girlSport = new Items ("Sporty Oufit for Women", prodImg8, 29.99, "S")
    let chicOut = new Items ("Fall outfit for a girl", prodImg9, 49.99, "S")

    productos.push(modernMaleOut, summerWomenOut, casualOut, ofWhite, sportOut, grungeOut, beachAcc, girlSport, chicOut)

    function prodSelec(prod) {
        wishProd.update((prodList) => {
            const prodExists = prodList.some((item) => item.name === prod.name)
            if (!prodExists) {
                prodList.push(prod)
                console.log(prodList)
            }
            return prodList
        })
    }

    const closeMenu = () => !checkValue
        
</script>


<section class="basis-[80%] relative bg-transparent w-[60%] h-auto p-4 border-r border-b rounded-md lg:mb-60 lg:w-[80%] transition-all drop-shadow-lg shadow-lg">
    <h2 class="text-lg mb-2">Our Products:</h2>
    <div class="HomeDivSet">
    {#each productos as prod }
        <figure class="HomefigSet group">
            <img class="HomeImgSet" src={prod.photo} alt="">
            <button on:click={() => prodSelec(prod)} class="absolute z-10 top-3 left-3 flex justify-center items-center w-12 h-10 p-1 bg-slate-200/50 border rounded-2xl active:bg-slate-500/50 transition duration-200 peer">
                <img class="w-[90%] h-[90%]" src={WishIcon} alt="">
            </button>  
            <div class="HomeHiddenInfo group-hover:opacity-100">
                <h2 class="text-base">{prod.name}</h2>
                <p class="text-sm">Size: {prod.size}</p>
                <h3 class="text-lg">Price: {prod.price}$</h3>
            </div>
        </figure>
    {/each}
    </div>
</section>
{#if checkValue}
    <div class="absolute z-10 left-[70%] w-96 h-auto rounded-md">
        <div class=" bg-slate-400 rounded-md p-3">
            <button class="w-10 h-10" on:click={closeMenu}>
                <img class="w-full h-full block" src={closeIcon} alt="">
            </button>
            <h2>Your WishList:</h2>
            {#each $wishProd as prod}
                <div class="flex w-[90%] h-28 gap-1 items-center justify-around transition">
                    <figure class="w-32 h-28">
                        <img class="w-full h-full block" src={prod.photo} alt="">
                    </figure>
                    <p class="self-center">{prod.name}</p>
                    <h3 class="self-center text-lg">{prod.price}</h3>
                    <button>-</button>
                </div>
                {:else}
                <p>You're not have any product yet</p>
            {/each}
        </div>  
    </div>
{/if}
