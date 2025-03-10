<script>
  import { tags } from "../Imports/images";
  import { navigate } from "svelte-routing";

  export let scrollHandler;
  let isScrolling = false
  let targetScroll = 950

  const navTo = (target, scrollState, tag) => {
      const currentScroll = scrollHandler()
      scrollState = true 
      if (scrollState && target !== currentScroll) {
        scrollTo(0, target)
        navigate(`/Search/${tag}`, {replace: true, preserveScroll: true})
      } else {
        scrollState = false
      }
  }

</script>

<div class="LoginSecForm  w-full flex-row justify-center gap-7 flex-wrap  mx-auto my-2">
  <button 
    on:click={() => navTo(targetScroll, isScrolling, "Fit")}
    class="group CategoriesCont"
    >
    <figure class="w-full h-full group-hover:scale-110 transition duration-300">
      <img class="globalImgRules" src={tags.fitTag} alt="" />
    </figure>
    <div
      class="CategoriesHiddenInfo">
      <p class="text-lg text-slate-200 lg:text-2xl">Fit</p>
    </div>
  </button>
  <button
    on:click={() => navTo(targetScroll, isScrolling, "Casual")}
    class="group CategoriesCont"
    >
    <figure class="w-full h-full group-hover:scale-110 transition duration-300">
      <img class="globalImgRules" src={tags.casualTag} alt="" />
    </figure>
    <div
      class="CategoriesHiddenInfo">
      <p class="text-lg text-slate-200 lg:text-2xl">Casual</p>
    </div>
  </button>
  <button
    on:click={() => navTo(targetScroll, isScrolling, "Summer")}
    class="group CategoriesCont"
    >
    <figure class="w-full h-full group-hover:scale-110 transition duration-300">
      <img class="globalImgRules" src={tags.summerTag} alt="" />
    </figure>
    <div
      class="CategoriesHiddenInfo">
      <p class="text-lg text-slate-800 lg:text-2xl">Summer</p>
    </div>
  </button>
</div>
