<script lang="ts">
  import Switch from './Switch.svelte';

  import { settings } from '$lib/stores/settings';
</script>

<div class="sections">
  <section>
    <div class="setting">
      <div class="text">
        <div class="title">Hard Mode</div>
        <div class="description">Any revealed hints must be used in subsequent guesses</div>
      </div>
      <div class="control">
        <Switch checked={$settings.hardMode} on:change={e => ($settings.hardMode = e.detail)} />
      </div>
    </div>
    <div class="setting">
      <div class="text">
        <div class="title">Dark Theme</div>
      </div>
      <div class="control">
        <Switch checked={$settings.darkTheme} on:change={e => ($settings.darkTheme = e.detail)} />
      </div>
    </div>
    <div class="setting">
      <div class="text">
        <div class="title">Color Blind Mode</div>
        <div class="description">High contrast colors</div>
      </div>
      <div class="control">
        <Switch checked={$settings.colorBlindTheme} on:change={e => ($settings.colorBlindTheme = e.detail)} />
      </div>
    </div>
  </section>
  <section>
    <div class="setting">
      <div class="text">
        <div class="title">Why?</div>
        <p>
          I created this clone of the real <a href="https://www.powerlanguage.co.uk/wordle/">wordle</a> so I could continue to play with my family after the NY Times takes over the original. I also added
          some random game support so we could play even after we complete the daily. If you enjoy it, great. I've open sourced my implementation and it's available to all on GitHub.
        </p>
      </div>
    </div>
  </section>
</div>
<div class="footnote">
  <div>
    <div class="link"><a href="https://github.com/braunsquared/wordl3" target="_blank">GitHub</a></div>
  </div>
</div>

<style>
  a,
  a:visited {
    color: var(--color-tone-2);
  }

  .setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-tone-4);
    padding: 16px 0;
  }

  .title {
    font-size: 18px;
  }
  .text {
    padding-right: 8px;
  }

  .description {
    font-size: 12px;
    color: var(--color-tone-2);
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    .setting {
      padding: 16px;
    }
  }
  .footnote {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    color: var(--color-tone-2);
    font-size: 12px;
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .link {
    text-align: left;
  }
</style>
