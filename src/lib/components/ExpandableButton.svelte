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

  $: expandedExtra = css`
		background-color: ${expandedStyle.backgroundColor ? expandedStyle.backgroundColor : '#D9D9D9'};
    color: ${expandedStyle.color ? expandedStyle.color : 'black'};
    border: ${expandedStyle.border ? expandedStyle.border : 'none'};
    position: ${expandedStyle.position ? expandedStyle.position : 'static'};
	`;

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
  <div class="{expandedClasses} {expandedExtra}">
    <slot name="expanded" />
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
  }

  .expanded.visible {
    height: auto;
    padding: 13px 15px;
  }
</style>