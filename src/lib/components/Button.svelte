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
      color: var(${style.disabledColor ? style.disabledColor : color});

      &::before {
        background-color: var(${style.disabledBackgroundColor ? style.disabledBackgroundColor : backgroundColor});
        opacity: ${style.disabledOpacity ? style.disabledOpacity : '0.5'};
      }
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
    position: relative;
    z-index: 1;
    transition: background-color 0.2s ease;

    &:disabled {
      cursor: default;
      background-color: transparent;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        pointer-events: none;
        border-radius: inherit; 
      }
    }
    
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
