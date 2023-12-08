<script>
	import "../styles/fonts.css"
	import "../styles/global.css"
	import Logo from "$lib/components/Logo.svelte";
	import Login from "$lib/components/Login.svelte";
	import {onMount} from "svelte";

	import { page } from "$app/stores"

	$: path = $page.url.pathname;

	function loginCompleted(event) {
		console.log('Entered LoginCompleted');
    // Access the data sent by the child component
    receivedData = event.detail.data;
    console.log('Received Data:', receivedData);
		isLoggedIn = true;
  }

	let isLoggedIn = false;
	let loggedInUser = false;
	let user = {
    "id": 0,
    "name": "",
    "username": ""
  };

	onMount(() => {
		loggedInUser = localStorage.getItem("loggedInUser");
		
		console.log(loggedInUser)
		if(loggedInUser){
			user = JSON.parse(loggedInUser)[0];
			console.log('User: ' + user.name + " ID: " + user.id)
			isLoggedIn = true;
		}
		
    });

	if (loggedInUser) {
    isLoggedIn = true;
  }

</script>

<div>
	
	<header>
		<Logo />
	</header>
	<main>
		{#if isLoggedIn}
			<slot />	
		{:else}
		 <Login on:loginComplete={loginCompleted}/>
		{/if}

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
