<script lang="ts">
  import BarGraph from './BarGraph.svelte';
  import CountdownTimer from './CountdownTimer.svelte';
  import Icon from './Icon.svelte';
  import StatisticItem from './StatisticItem.svelte';

  import { MaxGuesses } from '$lib/game/constants';

  import { stats } from '$lib/stores/stats';
  import { game } from '$lib/stores/game';
  import { daily } from '$lib/stores/daily';
  import { random } from '$lib/stores/random';
  import { settings } from '$lib/stores/settings';
  import { toast } from '$lib/stores/toast';

  import type { StatisticsStore } from '$lib/models/stats';
  import { EvaluationResult, GameStatus, GameMode } from '$lib/models/game';
  import shareOrClipboard from '$lib/util/shareOrClipboard';
  import newRandomGame from '$lib/game/newRandomGame';
  import { createEventDispatcher } from 'svelte';
  import abandonGame from '$lib/game/abandonGame';
  import { goto } from '$app/navigation';
  import getDailyGameIndex from '$lib/game/getDailyGameIndex';

  export let title: string;
  export let initialMode: GameMode;

  const activeDaily = getDailyGameIndex();
  const dispatcher = createEventDispatcher<{ newGame: void; abandonGame: void }>();

  let mode: keyof StatisticsStore = initialMode;
  let maxGuesses: number = 0;

  $: maxGuesses = Math.max.apply(Math, Object.values($stats[mode].guesses));

  const shareResults = async () => {
    let state = $game[mode];

    let message = `${title.toLowerCase()} ${state.gameNumber} ${state.status === GameStatus.Win ? state.rowIndex : 'X'}/${MaxGuesses}${$settings.hardMode ? '*' : ''}\n\n`;
    for (let i = 0; i < state.rowIndex; i++) {
      message += state.board[i].evaluation
        .map(e => {
          if (e === EvaluationResult.Correct) {
            return $settings.colorBlindTheme ? '🟧' : '🟩';
          } else if (e === EvaluationResult.Present) {
            return $settings.colorBlindTheme ? '🟦' : '🟨';
          } else {
            return $settings.darkTheme ? '⬛' : '⬜';
          }
        })
        .join('');
      message += '\n';
    }

    if (state.mode === GameMode.Random) {
      message += `https://wordl3.com/${state.mode}/${state.gameNumber}`;
    }

    try {
      const didShare = await shareOrClipboard(message);
      if (!didShare) {
        toast.push('Copied to clipboard!');
      }
    } catch (e) {
      toast.push('Share failed');
    }
  };

  const getGameStore = (mode: keyof StatisticsStore) => {
    switch (mode) {
      case 'daily':
        return daily;
      case 'random':
        return random;
    }
  };

  const onNewRandomGame = () => {
    newRandomGame(random);
    goto(`/random/${$random.gameNumber}`);
    dispatcher('newGame');
  };

  const onContinueGame = () => {
    goto(`/${mode}`);
  };

  const onAbandonGame = () => {
    abandonGame(getGameStore(mode));
    dispatcher('abandonGame');
  };
</script>

<div class="container">
  <h1>Statistics</h1>
  <div class="mode">
    <button class:selected={mode === 'daily'} on:click={() => (mode = 'daily')}> Daily </button>
    <button class:selected={mode === 'random'} on:click={() => (mode = 'random')}> Random </button>
  </div>
  <div id="statistics">
    <StatisticItem label="Games played" value={$stats[mode].gamesPlayed} />
    <StatisticItem label="Win Percentage" value={$stats[mode].winPercentage} />
    <StatisticItem label="Current Streak" value={$stats[mode].currentStreak} />
    <StatisticItem label="Max Streak" value={$stats[mode].maxStreak} />
  </div>
  <h1>Guess Distribution</h1>
  <div id="guess-distribution">
    {#if Object.values($stats[mode].guesses).every(g => g === 0)}
      <div class="no-data">No Data</div>
    {:else}
      {#each Object.entries($stats[mode].guesses) as [guess, count]}
        {#if guess !== 'fail'}
          <BarGraph label={guess} value={count} width={Math.max(7, Math.round((count / maxGuesses) * 100))} />
        {/if}
      {/each}
    {/if}
  </div>
  {#if $game[mode].status !== GameStatus.InProgress}
    <div class="footer">
      <div class="left">
        {#if mode === 'daily'}
          {#if activeDaily === $game.daily.gameNumber}
            <h1>Next {title}</h1>
            <div id="timer">
              <div class="statistic-container">
                <div class="statistic timer">
                  <CountdownTimer />
                </div>
              </div>
            </div>
          {:else}
            <button on:click={onContinueGame}>Play Daily</button>
          {/if}
        {:else}
          <button on:click={onNewRandomGame}>New Random</button>
        {/if}
      </div>
      <div class="right">
        <button class="share-button" on:click={shareResults}>
          Share <Icon class="share-icon" icon="share" />
        </button>
      </div>
    </div>
  {:else}
    <div class="footer">
      <div class="left">
        <button on:click={onContinueGame}>Continue Game</button>
      </div>
      <div class="right">
        <button on:click={onAbandonGame}>Abandon Game</button>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
  }

  h1 {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
  }

  #statistics {
    display: flex;
  }

  .statistic.timer {
    font-variant-numeric: initial;
  }

  .statistic-container {
    flex: 1;

    .statistic {
      font-size: 36px;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      letter-spacing: 0.05em;
      font-variant-numeric: proportional-nums;
    }
  }

  #guess-distribution {
    width: 80%;
  }

  #statistics,
  #guess-distribution {
    padding-bottom: 10px;
  }

  .footer {
    display: flex;
    width: 100%;

    .left,
    .right {
      flex: 1;
      display: flex;
      align-items: stretch;
      justify-content: center;
      flex-direction: column;
    }

    .left {
      border-right: 1px solid var(--color-tone-1);
      padding-right: 12px;
    }
    .right {
      padding-left: 12px;
    }

    button {
      background-color: var(--key-bg-correct);
      color: var(--key-evaluated-text-color);
      font-family: inherit;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
      font-size: 20px;
      height: 52px;
      padding-left: 20px;
      padding-right: 20px;
      filter: brightness(100%);

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .no-data {
    text-align: center;
  }

  .share-button {
    :global(.share-icon) {
      width: 24px;
      height: 24px;
      padding-left: 8px;
    }
  }

  .mode {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    margin-bottom: 15px;

    button {
      background-color: var(--key-bg-absent);
      color: var(--key-evaluated-text-color);
      font-family: inherit;
      font-weight: bold;
      cursor: pointer;
      border: none;
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
      font-size: 20px;
      height: 52px;
      width: 150px;
      filter: brightness(100%);

      &.selected {
        background-color: var(--key-bg-correct);
      }

      &:first-child {
        border-radius: 4px 0 0 4px;
      }

      &:last-child {
        border-radius: 0 4px 4px 0;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }
</style>
