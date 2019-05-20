<template>
    <div>
        <h2>Messages</h2>
        <list :lists="tchats" @open-tchat="openTchat" />
    </div>
</template>
<script>
import List from './list'

export default {
    name: 'Sidebar',
    props: ['tchats'],
    components: {
        List
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
        text-align: center;
    }

</style>
