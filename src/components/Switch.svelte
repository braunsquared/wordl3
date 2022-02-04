<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let checked: boolean = false;
  export let disabled: boolean = false;

  const dispatcher = createEventDispatcher<{ change: boolean }>();
  const dispatchChange = (value: boolean) => dispatcher('change', value);
</script>

<div class="container" class:checked class:disabled>
  <div class="switch" on:click={() => dispatchChange(!checked)}>
    <span class="knob" />
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: space-between;

    .switch {
      height: 20px;
      width: 32px;
      vertical-align: middle;
      /* not quite right */
      background: var(--color-tone-3);
      border-radius: 999px;
      display: block;
      position: relative;
    }

    .knob {
      display: block;
      position: absolute;
      left: 2px;
      top: 2px;
      height: calc(100% - 4px);
      width: 50%;
      border-radius: 8px;
      background: var(--white);
      transform: translateX(0);
      transition: transform 0.3s;
    }

    &.checked {
      .switch {
        background: var(--color-correct);
      }

      .knob {
        transform: translateX(calc(100% - 4px));
      }
    }

    &.disabled {
      .switch {
        opacity: 0.5;
      }
    }
  }
</style>
