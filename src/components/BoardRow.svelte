<script lang="ts">
  import { BoardSize } from '$lib/game/constants';
  import { RowState, EvaluationResult, RowStatus } from '$lib/models/game';

  import Tile from './Tile.svelte';

  export let row: RowState;
  export let invalid: boolean = false;
  export let win: boolean = false;

  interface TileState {
    id: string;
    letter: string;
    evaluation: EvaluationResult | null;
  }

  const getTiles = (state: RowState): TileState[] => {
    const tiles: TileState[] = [];
    for (let i = 0; i < BoardSize; i++) {
      const letter = state.letters[i] || '';
      const evaluation = state.evaluation?.[i] || null;
      tiles.push({
        id: `${i}-${evaluation}`,
        letter,
        evaluation,
      });
    }
    return tiles;
  };

  $: tiles = getTiles(row);
  $: invalid = row.status === RowStatus.Invalid;
  $: win = row.status === RowStatus.Win;
</script>

<div class="row" class:invalid class:win>
  {#each tiles as tile (tile.id)}
    <Tile letter={tile.letter} evaluation={tile.evaluation} />
  {/each}
</div>

<style lang="scss">
  .row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;

    &.invalid {
      animation-name: Shake;
      animation-duration: 600ms;
    }

    &.win {
      animation-name: Bounce;
      animation-duration: 1000ms;
    }
  }

  @keyframes Bounce {
    0%,
    20% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    50% {
      transform: translateY(5px);
    }
    60% {
      transform: translateY(-15px);
    }
    80% {
      transform: translateY(2px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes Shake {
    10%,
    90% {
      transform: translateX(-1px);
    }

    20%,
    80% {
      transform: translateX(2px);
    }

    30%,
    50%,
    70% {
      transform: translateX(-4px);
    }

    40%,
    60% {
      transform: translateX(4px);
    }
  }
</style>
