<script lang="ts">
  import { RowStatus } from '$lib/models/game';
  import type { RowState } from '$lib/models/game';
  import BoardRow from './BoardRow.svelte';

  export let board: RowState[];
  export let width: number = 350;
  export let height: number = 420;
</script>

<div class="board" style:width={`${width}px`} style:height={`${height}px`}>
  {#each board as row}
    <BoardRow {row} invalid={row.status === RowStatus.Invalid} win={row.status === RowStatus.Win} />
  {/each}
</div>

<style lang="scss">
  .board {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
