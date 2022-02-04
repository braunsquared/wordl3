<script lang="ts">
  import type { EvaluationResult } from '$lib/models/game';

  export let letter: string;
  export let evaluation: EvaluationResult | null = null;

  let state = 'empty';
  let animation = 'idle';

  const getState = (value: string | null, result: EvaluationResult | null) => {
    let state = 'empty';
    if (evaluation) {
      state = evaluation;
    } else if (letter) {
      state = 'tbd';
    }
    return state;
  };

  $: {
    const lastState = state;
    state = getState(letter, evaluation);

    if (lastState !== state) {
      if (state === 'tbd') {
        animation = 'pop';
      } else {
        animation = 'idle';
      }
    }
  }
</script>

<div class="tile" data-state={state} data-animation={animation}>{letter}</div>

<style lang="scss">
  .tile {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: bold;
    vertical-align: middle;
    box-sizing: border-box;
    color: var(--tile-text-color);
    text-transform: uppercase;
    user-select: none;

    &:before {
      content: '';
      display: inline-block;
      padding-bottom: 100%;
    }

    /* Allow tiles to be smaller on small screens */
    @media (max-height: 600px) {
      font-size: 1em;
      line-height: 1em;
    }

    &[data-state='empty'] {
      border: 2px solid var(--color-tone-4);
    }

    &[data-state='tbd'] {
      background-color: var(--color-tone-7);
      border: 2px solid var(--color-tone-3);
      color: var(--color-tone-1);
    }
    &[data-state='correct'] {
      background-color: var(--color-correct);
    }
    &[data-state='present'] {
      background-color: var(--color-present);
    }
    &[data-state='absent'] {
      background-color: var(--color-absent);
    }

    &[data-animation='pop'] {
      animation-name: PopIn;
      animation-duration: 100ms;
    }

    &[data-animation='flip-in'] {
      animation-name: FlipIn;
      animation-duration: 250ms;
      animation-timing-function: ease-in;
    }

    &[data-animation='flip-out'] {
      animation-name: FlipOut;
      animation-duration: 250ms;
      animation-timing-function: ease-in;
    }
  }

  @keyframes PopIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }

    40% {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  @keyframes FlipIn {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(-90deg);
    }
  }

  @keyframes FlipOut {
    0% {
      transform: rotateX(-90deg);
    }
    100% {
      transform: rotateX(0);
    }
  }
</style>
