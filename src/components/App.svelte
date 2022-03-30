<script lang="ts">
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  import Icon from './Icon.svelte';
  import Keyboard from './Keyboard.svelte';
  import Board from './Board.svelte';
  import Toaster from './Toaster.svelte';
  import Help from './Help.svelte';
  import Modal from './Modal.svelte';
  import Page from './Page.svelte';
  import Statistics from './Statistics.svelte';
  import Settings from './Settings.svelte';

  import { toast } from '$lib/stores/toast';
  import { settings } from '$lib/stores/settings';

  import { GameStatus, GameMode, RowStatus, GameState } from '$lib/models/game';

  import validateHardModeGuess from '$lib/game/validateHardModeGuess';
  import evaluateGuess from '$lib/game/evaluateGuess';
  import dictionary from '$lib/assets/dictionary.json';
  import words from '$lib/assets/wordlist.json';
  import { Accolades, BoardSize, MaxGuesses } from '$lib/game/constants';
  import updateStatistics from '$lib/game/updateStatistics';

  export let title: string;
  export let game: Writable<GameState>;

  let showHelp = false;
  const toggleHelp = () => (showHelp = !showHelp);

  let showStats = false;
  const toggleStats = () => (showStats = !showStats);

  let showSettings = false;
  const toggleSettings = () => (showSettings = !showSettings);

  const evaluateRow = () => {
    const value = $game.board[$game.rowIndex].letters;

    if (value.length === BoardSize) {
      if (!dictionary.includes(value) && !words.includes(value)) {
        toast.push('Not in word list');
        $game.board[$game.rowIndex].status = RowStatus.Invalid;
        return;
      }

      if ($settings.hardMode) {
        const result = validateHardModeGuess(value, $game.board[$game.rowIndex - 1]);
        if (!result.valid) {
          toast.push(result.message || 'Not valid in hard mode');
          $game.board[$game.rowIndex].status = RowStatus.Invalid;
          return;
        }
      }
      $game.board[$game.rowIndex].evaluation = evaluateGuess(value, $game.solution);
      $game.board[$game.rowIndex].status = RowStatus.Ok;
      $game.rowIndex += 1;

      const isOver = $game.rowIndex >= MaxGuesses;
      const isWin = value === $game.solution;

      if (isOver || isWin) {
        updateStatistics($game.mode, {
          isWin,
          numGuesses: $game.rowIndex,
        });

        $game.status = isWin ? GameStatus.Win : GameStatus.Fail;

        if ($game.status === GameStatus.Win) {
          toast.push({ msg: Accolades[$game.rowIndex - 1], win: true });
          $game.board[$game.rowIndex - 1].status = RowStatus.Win;
        } else {
          toast.push({
            msg: $game.solution.toUpperCase(),
            duration: 3000,
          });
        }

        setTimeout(() => {
          toggleStats();
        }, 1000);
      }
    }
  };

  const submitGuess = () => {
    if ($game.status === GameStatus.InProgress) {
      if ($game.board[$game.rowIndex].letters.length < BoardSize) {
        toast.push('Not enough letters');
        $game.board[$game.rowIndex].status = RowStatus.Invalid;
        return;
      }

      evaluateRow();
    }
  };

  const onKeyPress = (key: string) => {
    if ($game.status !== GameStatus.InProgress) {
      return;
    }

    if (key === 'Backspace') {
      $game.board[$game.rowIndex].letters = $game.board[$game.rowIndex].letters.slice(0, -1);
      $game.board[$game.rowIndex].status = RowStatus.Ok;
    } else if (key === 'Enter') {
      submitGuess();
    } else {
      $game.board[$game.rowIndex].letters += key;
      if ($game.board[$game.rowIndex].letters.length > 5) {
        $game.board[$game.rowIndex].letters = $game.board[$game.rowIndex].letters.slice(0, 5);
      }
      $game.board[$game.rowIndex].status = RowStatus.Ok;
    }
  };

  let boardContainer;
  let boardWidth = 0;
  let boardHeight = 0;

  onMount(() => {
    // check to see if we need to pick a new solution
    // const today = new Date();
    // if (!$game.lastPlayedTs || daysBetween($game.lastPlayedTs, today.getTime()) >= 1) {
    //   newDailyGame(game);
    // }

    // size the board
    boardWidth = Math.min(Math.floor(boardContainer.clientHeight * (5 / 6)), 350);
    boardHeight = MaxGuesses * Math.floor(boardWidth / BoardSize);

    if (!$game.lastPlayedTs) {
      $game.lastPlayedTs = Date.now();
      setTimeout(() => {
        toggleHelp();
      }, 100);
    } else if ($game.status !== GameStatus.InProgress) {
      setTimeout(() => {
        toggleStats();
      }, 100);
    }
  });
</script>

<div class="game">
  <header>
    <div class="menu">
      <button class="icon" aria-label="help" on:click={toggleHelp}>
        <Icon icon="help" />
      </button>
    </div>
    <div class="title">
      <span class="name">{title}</span>
      {#if $game.mode === GameMode.Daily}
        <span class="mode">{$game.mode}</span>
      {:else if $game.mode === GameMode.Random}
        <span class="mode">{$game.mode} #{$game.gameNumber}</span>
      {/if}
    </div>
    <div class="menu">
      <button class="icon" aria-label="statistics" on:click={toggleStats}>
        <Icon icon="statistics" />
      </button>
      <button class="icon" aria-label="settings" on:click={toggleSettings}>
        <Icon icon="settings" />
      </button>
    </div>
  </header>
  <div class="board-container" bind:this={boardContainer}>
    <Board board={$game.board} width={boardWidth} height={boardHeight} />
  </div>
  <Keyboard {game} on:keypress={e => onKeyPress(e.detail)} />
  <Toaster />
  {#if showHelp}
    <Modal on:close={toggleHelp}>
      <Help {title} />
    </Modal>
  {/if}
  {#if showStats}
    <Modal on:close={toggleStats}>
      <Statistics {title} initialMode={$game.mode} on:newGame={toggleStats} />
    </Modal>
  {/if}
  {#if showSettings}
    <Page on:close={toggleSettings} title="Settings">
      <Settings />
    </Page>
  {/if}
</div>

<style lang="scss">
  .game {
    width: 100%;
    max-width: var(--game-max-width);
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height);
    color: var(--color-tone-1);
    border-bottom: 1px solid var(--color-tone-4);

    .title {
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      pointer-events: none;
      text-transform: uppercase;
      letter-spacing: 0.2rem;

      .name {
        display: block;
        font-weight: 700;
        font-size: 24px;

        @media (max-width: 360px) {
          font-size: 12px;
          letter-spacing: 0.1rem;
        }
      }

      .mode {
        display: block;
        font-size: 12px;

        @media (max-width: 360px) {
          font-size: 12px;
          letter-spacing: 0.1rem;
        }
      }
    }
  }

  .board-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    overflow: hidden;
  }

  .icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 4px;
  }
</style>
