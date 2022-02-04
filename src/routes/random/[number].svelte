<script>
  import { browser } from '$app/env';
  import { page } from '$app/stores';

  import App from '../../components/App.svelte';

  import newRandomGame from '$lib/game/newRandomGame';

  import { random } from '$lib/stores/random';

  import '../../app.css';
  import { goto } from '$app/navigation';
  import { GameStatus } from '$lib/models/game';
  import abandonGame from '$lib/game/abandonGame';

  try {
    const gameIndex = parseInt($page.params['number']);

    if ($random.gameNumber !== gameIndex) {
      if ($random.status === GameStatus.InProgress) {
        abandonGame(random);
      }
      newRandomGame(random, gameIndex);
    }
  } catch (e) {
    if (browser) {
      goto('/random');
    }
  }
</script>

<App title="WORDL3" game={random} />
