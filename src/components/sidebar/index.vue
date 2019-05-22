<template>
    <div>
        <h2>Messages</h2>
        <list :user="user" :lists="tchats" @open-tchat="openTchat" />
    </div>
</template>
<script>
import List from './list'
import io from 'socket.io-client';

export default {
    name: 'Sidebar',
    props: ['tchats', 'user'],
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
