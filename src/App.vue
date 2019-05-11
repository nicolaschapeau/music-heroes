<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      return ( this.$route.meta.layout || 'default' ) + '-layout'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato');


#app {
  font-family: 'Lato', Arial, 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444;
}

</style>
