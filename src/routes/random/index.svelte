<script>
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';

  import { random } from '$lib/stores/random';
  import newRandomGame from '$lib/game/newRandomGame';

  import { GameStatus } from '$lib/models/game';

  import '../../app.css';

  if (browser) {
    if ($random.status === GameStatus.InProgress) {
      goto(`/random/${$random.gameNumber}`);
    } else {
      newRandomGame(random);
      goto(`/random/${$random.gameNumber}`);
    }
  }
</script>
