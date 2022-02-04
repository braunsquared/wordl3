<script lang="ts">
  import { fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';

  import { toast } from '$lib/stores/toast';

  import type { ToastItem } from '$lib/models/toast';

  export let item: ToastItem;

  const progress = tweened(0, { duration: item.duration, easing: linear });
  const autoclose = () => {
    if ($progress === 1 || $progress === 0) {
      toast.pop(item.id);
    }
  };
  progress.set(1).then(autoclose);
</script>

<div class="toast" class:win={item.win} out:fade>{item.msg}</div>

<style>
  .toast {
    position: relative;
    margin: 16px;
    background-color: var(--color-tone-1);
    color: var(--color-tone-7);
    padding: 16px;
    border: none;
    border-radius: 4px;
    opacity: 1;
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
    font-weight: 700;
  }
  .win {
    background-color: var(--color-correct);
    color: var(--tile-text-color);
  }
</style>
