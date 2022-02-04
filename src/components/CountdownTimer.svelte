<script lang="ts">
  import { readable } from 'svelte/store';

  const nextDaily = new Date();
  nextDaily.setDate(nextDaily.getDate() + 1);
  nextDaily.setHours(0, 0, 0, 0);

  const targetEpoch = nextDaily.getTime();

  const mstime = readable(new Date().getTime(), set => {
    let animationFrame;
    const next = () => {
      set(new Date().getTime());
      animationFrame = requestAnimationFrame(next);
    };
    if (window.requestAnimationFrame) {
      next();
      return () => cancelAnimationFrame(animationFrame);
    }
  });

  let hours: string;
  let mins: string;
  let secs: string;

  $: millis = targetEpoch - $mstime;
  $: hours = `${Math.floor((millis % 86400000) / 3600000)}`.padStart(2, '0');
  $: mins = `${Math.floor((millis % 3600000) / 60000)}`.padStart(2, '0');
  $: secs = `${Math.floor((millis % 60000) / 1000)}`.padStart(2, '0');
</script>

{hours}:{mins}:{secs}
