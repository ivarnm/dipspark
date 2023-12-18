<script>
	import { user } from '$lib/stores/stores.js';
  import ExpandableButton from '$lib/components/ExpandableButton.svelte';

  let expanded = false;

	const handleLogout = () => {
		localStorage.removeItem("loggedInUser")
		location.reload(true);
		// console.log('Logging out...');
	};

  const handleClick = () => {
    expanded = !expanded
    console.log("click");
  }

  const style = {
    backgroundColor: '#F4F1DE',
    padding: '5px 22px',
    border: '1px solid #3D405B'
  }

  const expandedStyle = {
    position: 'absolute'
  }
</script>

<div class="container">
  <ExpandableButton {style} {expandedStyle} on:buttonClick={handleClick}>
    <div slot="button" class="name">
      {#if $user}
        <span>{$user.name}</span>
        <div class="arrow"  style="transform: {expanded ? 'rotateZ(-180deg)' : 'rotateZ(0deg'}">
          <svg width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 1.01037C25 0.751735 24.905 0.493098 24.7153 0.295945C24.3358 -0.0986485 23.72 -0.0986485 23.3405 0.295945L12.4999 11.5608L1.65959 0.295945C1.27987 -0.0986485 0.664309 -0.0986485 0.284585 0.295945C-0.0948616 0.690539 -0.0948616 1.3302 0.284585 1.7248L11.8124 13.7041C12.1919 14.0986 12.8077 14.0986 13.1872 13.7041L24.715 1.7248C24.905 1.52764 25 1.26901 25 1.01037Z" fill="black"/>
          </svg>  
        </div>
      {/if}
    </div>
    <div slot="expanded" class="expanded">
      <button on:click={handleLogout}>Logg ut</button>
    </div>
  </ExpandableButton>
</div>

<style>
  .container {
    min-width: 150px;
    max-width: fit-content;
    /* position: relative; */
  }

  .expanded {
  }

  .name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .arrow {
    transition: transform 0.3s ease;
  }

  button {
    margin: 0;
    padding: 5px 10px;
    font-size: 20px;
    text-decoration: underline;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

</style>
