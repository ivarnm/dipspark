<script>
  import Button from "$lib/components/Button.svelte";

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
</script>


<div class="container" on:click={toggleExpanded} on:keydown={() => {}}>
  <div class="button">
    <Button {style}>
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