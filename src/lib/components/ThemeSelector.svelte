<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/stores';
	import DropdownMenu from '$lib/components/DropdownMenu.svelte';
	import Eclipse from '$lib/icons/Eclipse.svelte';
  import ChristmasEclipse from '$lib/icons/ChristmasEclipse.svelte';
  import HalloweenEclipse from '$lib/icons/HalloweenEclipse.svelte';
  
  const themes = [
    { value: 'system', label: 'Automatisk' },
    { value: 'light', label: 'Lys' },
    { value: 'dark', label: 'Mørk' },
    { value: 'warm', label: 'Varm' },
    { value: 'cool', label: 'Kald' },
    // { value: 'halloween', label: 'Halloween' },
    // { value: "christmas", label: "Jul" }
  ];

  onMount(() => {
    if (typeof window == 'undefined') return;
    
    let storedTheme = localStorage.getItem('theme');
    let systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (storedTheme && themes.some(themeOption => themeOption.value === storedTheme)) {
      theme.set(storedTheme);
    } 
    else {
      theme.set('system');
      applyTheme(systemTheme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      systemTheme = e.matches ? 'dark' : 'light';
      if (storedTheme === 'system') {
        applyTheme(systemTheme);
      }
    });

    theme.subscribe(value => {
      if (value === 'system') {
        applyTheme(systemTheme);
      } 
      else {
        applyTheme(value);
      }

      localStorage.setItem('theme', value);
      storedTheme = value;
    });
  });

  function applyTheme(theme: string) {
    document.documentElement.className = "";
    if(theme === 'system') return;
    document.documentElement.classList.add(`${theme}-theme`);
  }

  let eclipse = themes.find(themeOption => themeOption.value === 'halloween') ? HalloweenEclipse : Eclipse;
  if (themes.find(themeOption => themeOption.value === 'christmas')) eclipse = ChristmasEclipse;

</script>

<DropdownMenu>
   <svelte:component slot="icon" this={eclipse}/>


  <div slot="dropdown">
    {#each themes as themeOption}
      <button 
        class="theme-button" 
        class:selected={$theme === themeOption.value}
        on:click={() => $theme = themeOption.value}
      >
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="7" fill="{$theme === themeOption.value ? 'var(--primary-60)' : 'transparent'}"/>
        </svg>
        <span>{themeOption.label}</span>
      </button>
    {/each}
  </div>
</DropdownMenu>


<style>
  :global(svg) {
    color: var(--neutral-70);
  }

  .theme-button.selected {
    font-weight: bold;
  }
</style>
