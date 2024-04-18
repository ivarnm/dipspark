<script>
	import { css } from '@emotion/css';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('buttonClick');
  };

	export let style = {};

  $: backgroundColor = style.backgroundColor ? style.backgroundColor : '--neutral-30';
  $: hoverColor = style.hoverColor ? style.hoverColor : '--neutral-30';
	$: button = css`
		background-color: var(${backgroundColor});
    border-radius: ${style.borderRadius ? style.borderRadius : '0'};
    padding: ${style.padding ? style.padding : '0 10px'};
    color: var(${style.color ? style.color : '--neutral-70'});
    border: ${style.border ? style.border : 'none'};

    &:active {
      background-color: var(${hoverColor});
    }
	`;

</script>

<button class="{button}" on:click={handleClick}>
	<slot />
</button>

<style>
  button {
    width: 100%;
    font-size: 20px;
    min-height: 53px;
    cursor: pointer;
  }

</style>
