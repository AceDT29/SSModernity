<script>
  import { svgIcons } from "../Imports/images.d.js";

  export let displayExcep;
  export let exception;
</script>

{#if displayExcep}
  <article class="fixed inset-0 bg-gradient-to-b from-slate-50/40 to-slate-800/40 flex items-center justify-center z-30 font-Lexend">
      <dialog open={displayExcep} class="bg-white w-[35vw] p-2 h-auto min-w-52 min-h-28 rounded shadow-lg z-50 animFadeDown animate-duration-700">
        <label class="w-10 h-10 relative left-[88%] active:scale-75 transition-all cursor-pointer lg:left-[92%] lg:w-12 lg:h-12" for="swt">
          <input bind:checked={displayExcep} type="checkbox" class="hidden" id="swt" />
          <img class="" src={svgIcons.closeIcon} alt="" />
        </label>
          {#each exception as err}
            <div class="flex flex-col gap-y-2 items-center">
              <figure class="w-20 h-20 lg:w-36 lg:h-36">
                <img class="globalImgs" src={svgIcons.ghost} alt="">
              </figure>
              <h1 class="text-lg text-black md:text-2xl font-lobster">Error {err.code}</h1>
              <p class="text-black text-sm md:text-base">{err.message}</p>
            </div>
            <div class="p-2 mt-3 lg:mt-20">
              <h1 class="font-extrabold text-black text-lg font-lobster md:text-2xl">SS Modernity</h1>
            </div>
          {/each}
          </dialog>
  </article>
{/if}

