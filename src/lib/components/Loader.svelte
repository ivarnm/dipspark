<script lang="ts">
  import { css } from '@emotion/css';
  import { theme } from "$lib/stores/stores"; 
	import GhostLoader from "./halloween/GhostLoader.svelte";

  export let style: any = {};

  $: loader = css`
    width: ${style.size ? style.size : '14px'};
    padding: ${style.thickness ? style.thickness : '4px'};
    background: var(${style.color ? style.color : '--neutral-0'});
	`;

</script>

{#if $theme === "halloween"}
  <GhostLoader />
{:else}
  <div class="loader {loader}"></div>
{/if}

<style>
  .loader {
    aspect-ratio: 1;
    border-radius: 50%;
    --_m: 
      conic-gradient(#0000 10%,#000),
      linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
            mask: var(--_m);
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    animation: l3 1s infinite linear;
  }
  @keyframes l3 {to{transform: rotate(1turn)}}
</style>
