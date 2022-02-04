<script>
  import { fade } from 'svelte/transition';

  import ToastItem from './ToastItem.svelte';

  import { toast } from '$lib/stores/toast';

  export let target = 'default';

  let items;
  $: items = $toast.filter(i => i.target === target);
</script>

<div class="toaster">
  {#each items as item (item.id)}
    <ToastItem {item} />
  {/each}
</div>

<style lang="scss">
  .toaster {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    pointer-events: none;
    width: fit-content;
  }
</style>
