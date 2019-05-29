<template>
    <div id="sidebar__container">
        <div id="chats__container">
            <h2>Messages</h2>
            <list class="chat__container" :user="user" :lists="tchats" @open-tchat="openTchat" />
        </div>
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
    #sidebar__container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
    }

    #sidebar__container h2 {
        margin-left: 20px;
        color: black;
        font-weight: 300;
        text-align: center;
    }

    #sidebar__container #chats__container {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
    }

    #sidebar__container .chat__container {
        width: 100%;
    }

</style>
