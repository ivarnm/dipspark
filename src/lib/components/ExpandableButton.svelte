<script>
  import { css } from '@emotion/css';
  import { createEventDispatcher } from 'svelte';
  import Button from "$lib/components/Button.svelte";
  
  const dispatch = createEventDispatcher();

  export let style
  export let expandedStyle = {}

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

  $: buttonStyle = {
    ...style,
    backgroundColor: expanded && !!style.expandedColor ? style.expandedColor : style.backgroundColor
  }

  $: expandedExtra = css`
    position: ${expandedStyle.position ? expandedStyle.position : 'static'};
	`;

  const handleClick = () => {
    dispatch('buttonClick', expanded);
  };
</script>


<div class="container">
  <div class="button" on:click={toggleExpanded} on:keydown={() => {}} aria-expanded={expanded}>
    <Button style={buttonStyle} on:buttonClick={handleClick}>
      <slot name="button" />
    </Button>
  </div>
  <div class="{expandedClasses} {expandedExtra}">
    {#if expanded}
      <slot name="expanded" />
    {/if}
  </div>
</div>

<style>
  .container {
    position: relative;
  }

  .expanded {
    font-size: 18px;
    height: 0;
    padding: 0 15px;
    overflow: hidden;
    transition: 0.3s ease;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--neutral-30);
  }

  .expanded.visible {
    height: auto;
    padding: 13px 15px;
  }
</style>