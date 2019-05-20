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
  color: #444;
}

img{
  border-radius: 5px;
}

::-webkit-scrollbar {
    width: 2px;
}

::-webkit-scrollbar-track {
    
    background: #ddd;
}
    
::-webkit-scrollbar-thumb {
    background: #666; 
}

.input-container {
    display: -ms-flexbox;
    display: flex;
    width: 100%;
}

.input-container .icon {
    padding: 10px 0;
    background: #fd8c30;
    color: white;
    min-width: 50px;
    text-align: center;
    cursor: pointer;
}

.input-field {
    width: 100%;
    padding: 10px;
    outline: none;
    border: 1px solid #fd8c30;
}

.btn {
    background-color: #fd8c30;
    color: white;
    padding: 15px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    transition: 0.3s;
}

.btn:hover {
    background: #f37335;
    transition: 0.3s;
}

</style>
