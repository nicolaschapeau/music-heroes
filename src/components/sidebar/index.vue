<template>
    <div>
        <h2>Messages</h2>
        <hr
        <list v-for="list in this.lists" :list="list" :key="list.id" @open-tchat="openTchat" />
    </div>
</template>
<script>
import List from './list'

export default {
    name: 'Sidebar',
    components: {
        List
    },
    data() {
        return {
            lists: []
        }
    },
    mounted () {
        let date = new Date()
        this.lists = [
            { id: 1, name: 'Benjamin BENOIT', content: "Bonjourourourourouroggggggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mGkC5SE_lbvQcfEba5GevCMNDRXTvOeHsd5UOXQ2zZs4zHHC', date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'Nicolas CHAPEAU', content: "Bonjourourourourourour2", imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mGkC5SE_lbvQcfEba5GevCMNDRXTvOeHsd5UOXQ2zZs4zHHC', date: date.toLocaleDateString("fr-FR") },
            { id: 3, name: 'Pierre-Alexandre PINHAS', content: "Bonjourourourourourour3", imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mGkC5SE_lbvQcfEba5GevCMNDRXTvOeHsd5UOXQ2zZs4zHHC', date: date.toLocaleDateString("fr-FR") }
        ]
    },
    methods: {
        openTchat(e) {
            this.$emit('open-tchat', e)
        }
    },
}
</script>

<style scoped>

    h2{
        color: #444;
    }

</style>
