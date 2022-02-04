<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import Icon from './Icon.svelte';

  export let open: boolean = true;

  const dispatcher = createEventDispatcher<{ close: void }>();
  const dispatchClose = () => dispatcher('close');
</script>

{#if open}
  <div class="overlay">
    <div class="content" in:fly={{ duration: 200, y: 30 }} out:fly={{ duration: 200, y: 60 }}>
      <slot />
      <div class="close-icon" on:click={dispatchClose}>
        <Icon class="icon" icon="close" />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .overlay {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    background-color: var(--opacity-50);
    z-index: 3000;
  }

  .content {
    position: relative;
    border-radius: 8px;
    border: 1px solid var(--color-tone-6);
    background-color: var(--modal-content-bg);
    color: var(--color-tone-1);
    box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
    width: 90%;
    max-height: 90%;
    overflow-y: auto;
    max-width: var(--game-max-width);
    padding: 16px;
    box-sizing: border-box;
  }

  .close-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .icon {
    position: fixed;
    user-select: none;
    cursor: pointer;
  }
</style>
