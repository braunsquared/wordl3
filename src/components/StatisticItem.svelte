<script lang="ts">
  export let value: string | number;
  export let label: string;
</script>

<div class="statistic-container">
  <div class="statistic">{value}</div>
  <div class="label">{label}</div>
</div>

<style lang="scss">
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

    .label {
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
</style>
