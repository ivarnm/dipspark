<script>
	import { css } from '@emotion/css';
  import { darken } from 'polished';

	export let style = {};

  const backgroundColor = style.backgroundColor ? style.backgroundColor : '#D9D9D9';
	const button = css`
		background-color: ${backgroundColor};
    border-radius: ${style.borderRadius ? style.borderRadius : '0'};
    padding: ${style.padding ? style.padding : '0 10px'};
    color: ${style.color ? style.color : 'black'};
    &:active {
      background-color: ${darken(0.1, backgroundColor)};
    }
	`;

</script>

<button class="{button}">
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
