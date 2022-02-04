<script>
  import App from '../components/App.svelte';
  import { daily } from '$lib/stores/daily';

  import daysBetween from '$lib/util/daysBetween';
  import newDailyGame from '$lib/game/newDailyGame';

  import '../app.css';

  // check to see if we need to pick a new solution
  const today = new Date();
  if (!$daily.lastPlayedTs || daysBetween($daily.lastPlayedTs, today.getTime()) >= 1) {
    newDailyGame(daily);
  }
</script>

<App title="WORDL3" game={daily} />
