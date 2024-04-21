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
    dispatch('buttonClick', expanded);
  }

  $: buttonStyle = {
    ...style,
    backgroundColor: expanded && !!style.expandedBackgroundColor ? style.expandedBackgroundColor : style.backgroundColor,
    color: expanded && !!style.expandedColor ? style.expandedColor : style.color,
    hoverColor: expanded && !!style.expandedHoverColor ? style.expandedHoverColor : style.hoverColor
  }

  $: expandedExtra = css`
    position: ${expandedStyle.position ? expandedStyle.position : 'static'};
	`;

  $: containerStyle = css`
    box-shadow: ${expanded ? 'none' : '0px 4px 4px 0px rgba(0, 0, 0, 0.2)'};
	`;
</script>


<div class="container {containerStyle}">
  <div class="button" on:click={toggleExpanded} on:keydown={() => {}} aria-expanded={expanded}>
    <Button style={buttonStyle}>
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
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  }
</style>