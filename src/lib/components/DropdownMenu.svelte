<script lang="ts">
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen
  }

  const handleDropdownFocusLoss = (event: FocusEvent) => {
    const focusedElement = event.relatedTarget instanceof HTMLElement ? event.relatedTarget : null;
    const menuElement = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;

    // Check if the new focus is inside the menu
    if (focusedElement && menuElement && menuElement.contains(focusedElement)) {
      return;
    }

    menuOpen = false;
  };
</script>

<div class="container">
  <div class="menu" on:focusout={handleDropdownFocusLoss}>
    <button class="avatar-btn" on:click={toggleMenu}>
      <slot name="icon"></slot>
    </button>

    {#if menuOpen}
      <div class="dropdown">
        <slot name="dropdown"></slot>
      </div>
    {/if}
  </div>
</div>

<style>
  .menu {
    position: relative;
  }

  .avatar-btn {
    background-color: transparent;  
    border: none;
    cursor: pointer;
    padding: 6px;
    margin: 0;
    border-radius: 50%;
    overflow: hidden;
    width: 49px;
    height: 49px; 
    display: flex;
    align-items: center;
    justify-content: center;
}


.avatar-btn:hover {
  outline: none;
  background-color: var(--neutral-30);
}

.dropdown {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: var(--neutral-30);
  border: 1px solid var(--neutral-40);
  color: var(--neutral-100);
  padding: 5px;
  z-index: 100;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
}

.dropdown :global(button) {
  padding: 10px 15px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.dropdown :global(button:hover) {
  background-color: var(--neutral-40);
}
</style>
