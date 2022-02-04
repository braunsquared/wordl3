<script lang="ts">
  export let label: string;
  export let value: number;
  export let width: number;
</script>

<div class="graph-container">
  <div class="guess">{label}</div>
  <div class="graph"><div class="graph-bar" style:width={`${width}%`}><div class="num-guesses">{value}</div></div></div>
</div>

<style lang="scss">
  .graph-container {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    padding-bottom: 4px;
    font-size: 14px;
    line-height: 20px;

    .graph {
      width: 100%;
      height: 100%;
      padding-left: 4px;

      .graph-bar {
        height: 100%;
        /* Assume no wins */
        width: 0%;
        position: relative;
        background-color: var(--color-absent);
        display: flex;
        justify-content: center;

        &.highlight {
          background-color: var(--color-correct);
        }

        &.align-right {
          justify-content: flex-end;
          padding-right: 8px;
        }
      }

      .num-guesses {
        font-weight: bold;
        color: var(--tile-text-color);
      }
    }
  }
</style>
