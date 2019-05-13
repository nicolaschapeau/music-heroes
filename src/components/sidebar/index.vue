<template>
  <div>
      <p>test</p>
    <tchat v-for="tchat in this.tchats" :tchat="tchat" :key="tchat.id" @open-tchat="openTchat" />
  </div>
</template>
<script>
import Tchat from './tchat'

export default {
    name: 'Sidebar',
    components: {
        Tchat
    },
    data() {
        return {
            tchats: []
        }
    },
    mounted () {
        this.tchats = [
        { id: 1, name: 'Banana', content: "Bonjourourourourourour", imageSrc: 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png' },
        { id: 2, name: 'Orange', content: "Bonjourourourourourour2", imageSrc: 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png' },
        { id: 3, name: 'Apple', content: "Bonjourourourourourour3", imageSrc: 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png' }
        ]
    },
    methods: {
        openTchat(e) {
            // Afficher le tchat dans le visuel
        }
    },
}
</script>

<style scoped>

</style>
