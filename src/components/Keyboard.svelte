<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { EvaluationResult } from '$lib/models/game';
  import type { GameState } from '$lib/models/game';

  import Icon from './Icon.svelte';

  export let game: Writable<GameState>;

  const layout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['-', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '-'],
    ['↵', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '←'],
  ];

  const dispatcher = createEventDispatcher<{ keypress: string }>();
  const dispatchKeyPress = (key: string) => {
    dispatcher('keypress', key);
  };

  const calculateKeyStates = (state: GameState): Record<string, EvaluationResult> => {
    const keys = {};
    for (let i = 0; i < state.rowIndex; i++) {
      for (let j = 0; j < state.board[i].letters.length; j++) {
        const letter = state.board[i].letters[j];
        const result = state.board[i].evaluation[j];

        if (!keys[letter]) {
          keys[letter] = result;
        } else {
          if (keys[letter] === EvaluationResult.Absent) {
            keys[letter] = result;
          } else if (keys[letter] === EvaluationResult.Present && result === EvaluationResult.Correct) {
            keys[letter] = result;
          }
        }
      }
    }

    return keys;
  };

  $: keyStates = calculateKeyStates($game);
</script>

<svelte:window
  on:keydown={e => {
    const key = e.key.toLowerCase();

    if (key.length > 1) {
      if (key === 'backspace' || key === 'enter') {
        dispatchKeyPress(e.key);
      }
    } else if (key >= 'a' || key <= 'z') {
      if (e.metaKey || e.ctrlKey) {
        return;
      }

      dispatchKeyPress(key);
    }
  }}
/>

<div class="keyboard">
  {#each layout as row}
    <div class="row">
      {#each row as key}
        {#if key === '←'}
          <button class="one-and-a-half" on:click={() => dispatchKeyPress('Backspace')}><Icon icon="backspace" /></button>
        {:else if key === '↵'}
          <button class="one-and-a-half" on:click={() => dispatchKeyPress('Enter')}>enter</button>
        {:else if key === '-'}
          <div class="spacer half" />
        {:else}
          <button class="one fade" on:click={() => dispatchKeyPress(key)} data-state={keyStates[key]}>{key}</button>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style>
  :host {
    height: var(--keyboard-height);
  }

  .keyboard {
    margin: 0 8px;
    user-select: none;
  }

  .row {
    display: flex;
    width: 100%;
    margin: 0 auto 8px;
    /* https://stackoverflow.com/questions/46167604/ios-html-disable-double-tap-to-zoom */
    touch-action: manipulation;
  }

  button {
    font-family: inherit;
    font-weight: bold;
    border: 0;
    padding: 0;
    margin: 0 6px 0 0;
    height: 58px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    background-color: var(--key-bg);
    color: var(--key-text-color);
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  }

  button:focus {
    outline: none;
  }

  .fade {
    transition: background-color 0.5s ease, color 0.5s ease;
  }

  button:last-of-type {
    margin: 0;
  }

  .half {
    flex: 0.5;
  }

  .one {
    flex: 1;
  }

  .one-and-a-half {
    flex: 1.5;
    font-size: 12px;
  }

  button[data-state='correct'] {
    background-color: var(--key-bg-correct);
    color: var(--key-evaluated-text-color);
  }

  button[data-state='present'] {
    background-color: var(--key-bg-present);
    color: var(--key-evaluated-text-color);
  }

  button[data-state='absent'] {
    background-color: var(--key-bg-absent);
    color: var(--key-evaluated-text-color);
  }
</style>
