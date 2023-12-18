<script>
	import "../styles/fonts.css"
	import "../styles/global.css"
	import { user } from '$lib/stores/stores.js'
	import Logo from "$lib/components/Logo.svelte";
	import Login from "$lib/components/Login.svelte";
	import UserDropdown from "$lib/components/UserDropdown.svelte"
	import {onMount} from "svelte";

	import { page } from "$app/stores"

	$: path = $page.url.pathname;

	let isLoggedIn = false;
	let loggedInUser = false;

	onMount(() => {
		loggedInUser = localStorage.getItem("loggedInUser");
		
		if(loggedInUser){
			$user = JSON.parse(loggedInUser)[0];
			isLoggedIn = true;
		}
		
    });

	if (loggedInUser) {
    isLoggedIn = true;
  }

</script>

<div>
	
	<header>
		<div class="user">
			{#if isLoggedIn}
				<UserDropdown />
			{/if}
		</div>

		<div class="logo">
			<Logo />
		</div>
	</header>
	<main>
		{#if isLoggedIn}
			<slot />	
		{:else}
		 <Login/>
		{/if}

	</main>
</div>


<style>
	header {
		display: flex;
		flex-direction: column;
	}

	.user {
		margin: 20px 30px;
		align-self: flex-end;
	}

	.logo {
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
