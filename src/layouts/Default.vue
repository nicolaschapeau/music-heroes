<template>
    <div class="cs-loader">
      <div class="cs-loader-inner">
          <label>●</label>
          <label>●</label>
          <label>●</label>
          <label>●</label>
          <label>●</label>
          <label>●</label>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .cs-loader {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .cs-loader-inner {
    top: 50%;
    position: absolute;
    width: calc(100% - 200px);
  }
</style>
