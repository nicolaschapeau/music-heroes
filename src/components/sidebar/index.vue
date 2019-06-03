<template>
    <div id="sidebar__container">
        <div id="chats__container">
            <h2>Messages</h2>
            <list v-for="tchat in tchats" :key="tchat.index" v-if="!nochat" class="chat__container" :user="user" :tchat="tchat" @open-tchat="openTchat" />
            <div v-if="nochat" class="no-list">
                <h4>Pas encore de message ?</h4>
                <p>Commencez par contacter un musicien !</p>
            </div>
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
    data () {
        return {
            nochat: false
        }
    },
    mounted () {
        this.checkChat()
    },
    methods: {
        openTchat(e) {
            this.$emit('open-tchat', e)
        },
        checkChat() {
            if(!this.tchats || this.tchats.length === 0){
                this.nochat = true
            } else {
                this.nochat = false
            }
        }
    },
    watch: {
        "tchats": function () {
            this.checkChat()
        }
    }
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

    .no-list{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
        width: 100%;
	}

</style>
