<script>
	import { css } from '@emotion/css';
  import { darken } from 'polished';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('buttonClick');
  };

	export let style = {};

  $: backgroundColor = style.backgroundColor ? style.backgroundColor : '#D9D9D9';
	$: button = css`
		background-color: ${backgroundColor};
    border-radius: ${style.borderRadius ? style.borderRadius : '0'};
    padding: ${style.padding ? style.padding : '0 10px'};
    color: ${style.color ? style.color : 'black'};

    &:active {
      background-color: ${darken(0.1, backgroundColor)};
    }
	`;

</script>

<button class="{button}" on:click={handleClick}>
	<slot />
</button>

<style>
  button {
    border: none;
    width: 100%;
    font-size: 20px;
    min-height: 53px;
    cursor: pointer;
  }

</style>
