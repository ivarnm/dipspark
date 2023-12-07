<script>
  import BookedDate from '$lib/components/BookedDate.svelte';

  export let bookings = []
	// const bookings = [
	// 	{
	// 		id: 1,
	// 		userId: 1,
	// 		parkingId: 1,
	// 		parkingDate: '2023-12-07T00:00:00',
	// 		createdDate: '2023-12-07T00:00:00'
	// 	},
	// 	{
	// 		id: 2,
	// 		userId: 1,
	// 		parkingId: 1,
	// 		parkingDate: '2023-12-07T00:00:00',
	// 		createdDate: '2023-12-07T00:00:00'
	// 	}
	// ];
</script>

<div class="container">
	<h2>Dine bookinger</h2>

	{#each bookings as booking (booking.id)}
		<BookedDate {booking} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 10px 0;
	}

	h2 {
		font-size: 20px;
		font-weight: 700;
		margin: 0;
		padding: 0;
	}
</style>
