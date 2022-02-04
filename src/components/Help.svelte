<script lang="ts">
  import { BoardSize, MaxGuesses } from '$lib/game/constants';
  import { EvaluationResult } from '$lib/models/game';
  import BoardRow from './BoardRow.svelte';
  import Tile from './Tile.svelte';

  export let title;
</script>

<section>
  <div class="instructions">
    <p>Guess the <strong>{title}</strong> in {MaxGuesses} tries.</p>
    <p>Each guess must be a valid {BoardSize} letter word. Hit the enter button to submit.</p>
    <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
    <div class="examples">
      <p><strong>Examples</strong></p>
      <div class="example">
        <BoardRow row={{ letters: 'weary', evaluation: [EvaluationResult.Correct] }} />
        <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
      </div>
      <div class="example">
        <BoardRow row={{ letters: 'pills', evaluation: [null, EvaluationResult.Present] }} />
        <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
      </div>
      <div class="example">
        <BoardRow row={{ letters: 'vague', evaluation: [null, null, null, EvaluationResult.Absent] }} />
        <p>The letter <strong>U</strong> is not in the word in any spot.</p>
      </div>
    </div>
    <p><strong>A new {title} will be available each day!<strong /></strong></p>
  </div>
</section>

<style>
  .instructions {
    font-size: 14px;
    color: var(--color-tone-1);
  }

  .examples {
    border-bottom: 1px solid var(--color-tone-4);
    border-top: 1px solid var(--color-tone-4);
  }

  .example {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  /* :global(.tile) {
    width: 40px;
    height: 40px;
  } */

  section {
    padding: 16px;
    padding-top: 0px;
  }
</style>
