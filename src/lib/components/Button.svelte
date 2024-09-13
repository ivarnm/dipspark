<script lang="ts">
	import { css } from '@emotion/css';
  import { createEventDispatcher } from 'svelte';
	import Loader from './Loader.svelte';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('buttonClick');
  };

	export let style: any = {};
  export let loading = false;
  export let disabled = false;

  $: backgroundColor = style.backgroundColor ? style.backgroundColor : '--neutral-30';
  $: color = style.color ? style.color : '--neutral-70';
	$: button = css`
		background-color: var(${backgroundColor});
    border-radius: ${style.borderRadius ? style.borderRadius : '0'};
    padding: ${style.padding ? style.padding : '0 10px'};
    color: var(${color});
    border: ${style.border ? style.border : 'none'};
    min-width: ${style.minWidth ? style.minWidth : 'auto'};

    &:active {
      background-color: var(${style.hoverColor ? style.hoverColor : '--neutral-30'});
    }

    &:disabled {
      background-color: rgb(from var(${style.disabledBackgroundColor ? style.disabledBackgroundColor : backgroundColor}) r g b / ${style.disabledOpacity ? style.disabledOpacity : '0.5'} );
      color: var(${style.disabledColor ? style.disabledColor : color});
    }
	`;
</script>

<button class="{button}" on:click={handleClick} disabled={loading || disabled}>
  {#if loading}
    <div class="loading">
      <Loader />
    </div>
  {:else}
      <slot />
  {/if}
</button>

<style>
  button {
    width: 100%;
    font-size: 20px;
    min-height: 53px;
    cursor: pointer;

    &:disabled {
      cursor: default;
    }
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
