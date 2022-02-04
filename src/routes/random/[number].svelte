<script>
  import { browser } from '$app/env';
  import { page } from '$app/stores';

  import App from '../../components/App.svelte';

  import newRandomGame from '$lib/game/newRandomGame';

  import { random } from '$lib/stores/random';

  import '../../app.css';
  import { goto } from '$app/navigation';

  try {
    const gameIndex = parseInt($page.params['number']);
    newRandomGame(random, gameIndex);
  } catch (e) {
    if (browser) {
      goto('/random');
    }
  }
</script>

<App title="WORDL3" game={random} />
