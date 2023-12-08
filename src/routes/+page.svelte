<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import Name from '$lib/components/Name.svelte';
	import BookedDate from '$lib/components/BookedDate.svelte';
	import YourBookings from '$lib/components/YourBookings.svelte';
	import PlusIcon from '$lib/components/PlusIcon.svelte';
	import {onMount} from "svelte";


	let name = "";
	onMount(() => {
		let loggedInUser = localStorage.getItem("loggedInUser");
		
		if(loggedInUser){
			let user = JSON.parse(loggedInUser)[0];
			name = user.name;
		}
		
    });

</script>

<div class="index">
	<div>
		<Name name={name} />
		<YourBookings bookingDays={data.bookingDays}  />
		<PlusIcon />
	</div>
</div>

<style>
	.index {
	}
</style>
