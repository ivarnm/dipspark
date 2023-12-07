<script>
	import "../styles/fonts.css"
	import "../styles/global.css"
	import Logo from "$lib/components/Logo.svelte";

	import { page } from "$app/stores"

	$: path = $page.url.pathname;
	
</script>

<div>
	
	<header>
		<Logo />
	</header>
	<main>
		<slot />
	</main>
</div>


<style>
	header {
		margin-top: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	main {
		margin: 50px 30px 50px 30px;
	}

	.home {
		text-decoration: none;
		font-size: 24px;
		margin-left: 10%;
		}
</style>
