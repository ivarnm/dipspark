<script lang="ts">
	import "../styles/fonts.css"
	import "../styles/global.scss"
	import { bookingDays, theme, user, users } from '$lib/stores/stores'
	import Logo from "$lib/components/Logo.svelte";
	import Login from "$lib/components/Login.svelte";
	import UserDropdown from "$lib/components/UserDropdown.svelte"
	import ThemeSelector from "$lib/components/ThemeSelector.svelte";
	import ShyGhost from "$lib/components/halloween/ShyGhost.svelte";

	import { page } from "$app/stores"
	import PlusIcon from "$lib/components/PlusIcon.svelte";

	export let data;

	if (data.users) users.set(data.users);
	if (data.bookingDays) bookingDays.set(data.bookingDays);

	if (data.user != null) user.set(data.user);
	$: isLoggedIn = !!data?.user;

	const anonymousPaths = ['/info'];
	$: path = $page.url.pathname;
	$: title = path === '/info' ? 'DIPS Park - Info' : 'DIPS Park';
	$: isAnonymousPath = anonymousPaths.includes(path);
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
<div>
	
	<header>
		<div class="navbar">
			<div class="links">
				{#if path !== '/'}
					<a href="/">Hjem</a>
				{/if}
				{#if path !== '/info'}
					<a href="/info">Info</a>
				{/if}
			</div>
			<div class="color">
				<ThemeSelector />
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
	{#if isLoggedIn && path === '/'}
		<PlusIcon />
	{/if}
	{#if path !== '/info' && $theme === 'halloween'}
		<ShyGhost />
	{/if}

	<div class="background"></div>
	<div class="background-overlay"></div>
</div>


<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 2;
		pointer-events: none;
	}

	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20px 30px;
		gap: 2px;
		pointer-events: all;
	}

	.links {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex: 1;
		gap: 10px;
	}

	.logo {
		margin-top: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: all;
	}

	main {
		margin: 50px 30px 50px 30px;
		position: relative;
		z-index: 1;
		pointer-events: none;
	}

	:global(.halloween-theme) {
		.background {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -2;
			background-image: url('/images/halloween/background.jpg');
			background-size: cover;
			background-position: left;
			background-repeat: no-repeat;
		}

		.background-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background-color: rgba(0, 0, 0, 0.8);
		}
	} 
</style>
