<script lang="ts">
	import "../styles/fonts.css"
	import "../styles/global.css"
	import { user } from '$lib/stores/stores'
	import Logo from "$lib/components/Logo.svelte";
	import Login from "$lib/components/Login.svelte";
	import UserDropdown from "$lib/components/UserDropdown.svelte"
	import {onMount} from "svelte";
	import type { User } from "$lib/model/models";

	import { page } from "$app/stores"

	let isLoggedIn = false;
	let loggedInUser: string | null;

	const anonymousPaths = ['/info'];
	$: path = $page.url.pathname;
	$: title = path === '/info' ? 'DIPS Park - Info' : 'DIPS Park';
	$: isAnonymousPath = anonymousPaths.includes(path);

	onMount(() => {
		loggedInUser = localStorage.getItem("loggedInUser");
		
		if(loggedInUser){
			$user = JSON.parse(loggedInUser)[0] as User;
			isLoggedIn = true;
		}
	});

</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
<div>
	
	<header>
		<div class="navbar">
			<div class="links">
				{#if path !== '/info'}
					<a href="/info">Info</a>
				{/if}
			</div>
			<div class="user">
				{#if isLoggedIn}
					<UserDropdown />
				{/if}
			</div>
		</div>

		<div class="logo">
			<Logo />
		</div>
	</header>
	<main>
		{#if isLoggedIn || isAnonymousPath}
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

	.navbar {
		display: flex;
		justify-content: space-between;
		margin: 20px 30px;
	}

	.links {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.user {
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
</style>
