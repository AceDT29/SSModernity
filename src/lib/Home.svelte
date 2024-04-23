<script>
    import prodImg1 from "../assets/imagen1.jpg"
    import prodImg2 from "../assets/imagen2.jpg"
    import prodImg3 from "../assets/imagen3.jpg"
    import prodImg4 from "../assets/imagen4.jpg"
    import prodImg5 from "../assets/imagen5.jpg"
    import prodImg6 from "../assets/imagen6.jpg"

    const productos = []

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

    productos.push(modernMaleOut, summerWomenOut, casualOut, ofWhite, sportOut, grungeOut) 
</script>

<section class="relative bg-transparent left-[35%] w-[60%] h-auto p-4 border-2 rounded-md lg:left-[15%] lg:w-[80%] transition-all drop-shadow-lg">
    <h2 class="">Our Products:</h2>
    <div class="DivSet">
    {#each productos as prod }
        <figure class="figSet group">
            <img class="ImgSet" src={prod.photo} alt="">
            <div class="HiddenInfo group-hover:opacity-100">
                <h2 class="text-base">{prod.name}</h2>
                <p class="text-sm">Size: {prod.size}</p>
                <h3 class="text-lg">Price: {prod.price}$</h3>
            </div>
        </figure>
    {/each}
    </div>
</section>