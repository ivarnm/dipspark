<script>
  import { createEventDispatcher } from 'svelte';
  import Button from "$lib/components/Button.svelte";
  
  const dispatch = createEventDispatcher();

  export let style

  let expanded = false;
  
  $: expandedClasses = 'expanded'

  const toggleExpanded = () => {
    expanded = !expanded
    if (expanded) {
      expandedClasses = 'expanded visible'
    }
    else {
      expandedClasses = 'expanded'
    }
  }

  const handleClick = () => {
    dispatch('buttonClick', expanded);
  };
</script>


<div class="container">
  <div class="button" on:click={toggleExpanded} on:keydown={() => {}}>
    <Button {style} on:buttonClick={handleClick}>
      <slot name="button" />
    </Button>
  </div>
  <div class={expandedClasses}>
    <slot name="expanded" />
  </div>
</div>

<style>
  .expanded {
    background-color: #D9D9D9;
    padding: 13px 15px;
    font-size: 18px;
    height: 0;
    padding: 0 15px;
    overflow: hidden;
    transition: 0.3s ease;
  }

  .expanded.visible {
    height: auto;
    padding: 13px 15px;
  }
</style>