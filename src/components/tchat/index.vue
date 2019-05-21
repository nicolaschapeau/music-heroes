<template>
	<div class="tchat" v-if="roomData">
        <div class="tchat__content">
            <div class="tchat__head">
                <p>{{ roomData.name }}</p>
                <i class="icon ion-md-close" @click="closeTchat()"></i>
            </div>
            <div class="tchat__messages" id="messageContainer">
                <messages :messages="messages" />
            </div>
            <div class="tchat__input">
                <form class="input-container" @submit.prevent="add()"> 
                    <input class="input-field" type="message" placeholder="Message" v-model="message" name="message" autofocus>
                    <i class="icon ion-md-send" @click.prevent="add()" :class="{ disabled: !loading, disabled: !message }"></i>
                </form>
            </div>
        </div>
	</div>
</template>


<script>
import Messages from './messages'
import { setTimeout } from 'timers';
import io from 'socket.io-client';

export default {
    name: 'Tchat',
    props: ['roomData'],
    components: {
        Messages
    },
    data() {
        return {
            message: null,
            messages: [],
            loading: false
        }
    },
    mounted () {
        let date = new Date()
        this.messages = [
            { id: 1, name: 'aaaaaaaa', content: "Bonjourourourourourour1", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date: date.toLocaleDateString("fr-FR") },
            { id: 3, name: 'bbbbbbbb', content: "ezfzefz http://okbutwin.fr fzefzfzefzef", date: date.toLocaleDateString("fr-FR") },
        ]
    },
    methods: {
        closeTchat () {
            this.$emit('close-tchat')
        },
        async add (){
            if (!this.message) {
                return
            }

            let socket = await this.$store.getters['getSocket']

            // Building message
            let date = new Date()
            this.loading = true
            const message = {
                name: 'aaaaaaaa',
                content: this.message,
                date: date.toLocaleDateString("fr-FR"),
                room: this.roomData._id
            }

            // Send message
            this.messages.push(message)
            await socket.emit('sendMessage', message, () => {

            })

            // Callback from server
            this.loading = false
        }
    }
}
</script>


<style scoped>

    .disabled {
        background: #888;
    }

    .tchat__content{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .tchat__head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fd8c30;
        width: 100%;
    }

    .tchat__head p{
        font-weight: bold;
    }

    .tchat__head p, .tchat__head i{
        margin: 0;
        padding: 16px;
    }

    .tchat__head i {
        cursor: pointer;
    }

    .tchat__messages{
        width: 100%; 
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .tchat__input{
        width: 100%;
        height: 40px;
    }
</style>