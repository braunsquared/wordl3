<script lang="ts">
  import { settings } from '$lib/stores/settings';

  const updateClass = (className: string, value: boolean | null) => {
    if (typeof window === 'undefined') return;

    if (value === true && !document.body.classList.contains(className)) {
      document.body.classList.add(className);
    } else if (!value && document.body.classList.contains(className)) {
      document.body.classList.remove(className);
    }
  };

  $: updateClass('nightmode', $settings.darkTheme);
  $: updateClass('colorblind', $settings.colorBlindTheme);
</script>

<slot />
