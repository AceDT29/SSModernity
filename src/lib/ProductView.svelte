<script>
    import { onMount } from "svelte"

    export let myProduct

    onMount(() => {
        console.log(myProduct)
    })
</script>


<div>
    <p>Tus Productos</p>
</div>