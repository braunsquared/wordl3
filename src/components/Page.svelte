<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';

  export let title: string = '';

  const dispatcher = createEventDispatcher<{ close: void }>();
  const dispatchClose = () => dispatcher('close');
</script>

<div class="overlay">
  <div class="content">
    <header>
      <h1>{title}</h1>
      <div class="close-icon" on:click={dispatchClose}>
        <Icon icon="close" />
      </div>
    </header>
    <div class="content-container">
      <slot />
    </div>
  </div>
</div>

<style>
  .overlay {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    background-color: var(--color-background);
    z-index: 2000;
  }

  .content {
    position: relative;
    color: var(--color-tone-1);
    padding: 0 32px;
    max-width: var(--game-max-width);
    width: 100%;
    overflow-y: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .content-container {
    height: 100%;
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  h1 {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
  }

  .close-icon {
    position: absolute;
    right: 0;
    user-select: none;
    cursor: pointer;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    .content {
      max-width: 100%;
      padding: 0;
    }
    .close-icon {
      padding: 0 16px;
    }
  }
</style>
