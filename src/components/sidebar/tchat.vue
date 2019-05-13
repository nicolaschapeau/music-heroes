<template>
  <div class="tchat" @click="openTchat(tchat)">
    <img :src="tchat.imageSrc" :alt="tchat.name" class="tchat__image">
    <div class="tchat__Details">
      <p><strong>{{ tchat.name }}</strong></p>
      <p>{{ tchat.content }}</p>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Tchat',
    props: ['tchat'],
    data() {
      return {}
    },
    methods: {
      openTchat(tchat) {
        this.$emit('open-tchat', tchat)
      }
    }
  }
</script>


<style>
</style>