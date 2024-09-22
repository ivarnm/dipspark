<script lang="ts">
  import { signOut } from "@auth/sveltekit/client"
	import { user } from '$lib/stores/stores';
	import DropdownMenu from "$lib/components/DropdownMenu.svelte";
	import { goto } from "$app/navigation";
</script>

<DropdownMenu>
  <img slot="icon" src="{$user.image}" alt="User avatar" />
  
  <div slot="dropdown">
    {#if $user.isAdmin}
      <button on:click={() => goto('/admin/statistics')}>
        <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.97998 15.6667H19.98" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.97998 11.6667L6.97998 5.66675L12.98 8.66675L19.98 1.66675" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.98 6.66675V1.66675H14.98" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>                  
        <span>Statistikk</span>
      </button>
    {/if}
    <button on:click={async () => await signOut()}>
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Logg ut</span>
    </button>
  </div>
</DropdownMenu>

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    border-radius: 50%;
  }
</style>
