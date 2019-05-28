<template>
	<div class="tchat" v-if="roomData">
        <div class="tchat__content">
            <div class="tchat__head">
                <p>{{ getName(roomData) }}</p>
                <i class="icon ion-md-close" @click="closeTchat()"></i>
            </div>
            <div class="tchat__messages" id="messageContainer">
                <messages :messages="messages" :user="user" />
            </div>
            <div class="tchat__input">
                <form class="input-container" @submit.prevent="createMessage()"> 
                    <input class="input-field" type="message" placeholder="Message" v-model="message" name="message" autofocus>
                    <i class="icon ion-md-send" @click.prevent="createMessage()" :class="{ disabled: !message, disabled: loading === true }"></i>
                </form>
            </div>
        </div>
	</div>
</template>


<script>
import Messages from './messages'
import { setTimeout } from 'timers';
import io from 'socket.io-client';
import api from '../../api/api';


export default {
    name: 'Tchat',
    props: ['roomData', 'messages', 'user'],
    components: {
        Messages
    },
    data() {
        return {
            message: null,
            loading: false,
        }
    },
    methods: {
        closeTchat () {
            this.$emit('close-tchat')
        },
        getName(roomData) {
            const response = roomData.users.find(data => data.user !== this.user._id)
			return response.name
		},
        async createMessage () {
            if (!this.message || this.loading === true ) {
                return
            }
            this.loading = true

            let socket = await this.$store.getters['getSocket']

            // Building message
            let date = new Date()
            const message = {
                content: this.message,
                date: date.toLocaleDateString("fr-FR"),
                room: this.roomData._id,
                user: this.me
            }

            this.message = null

            // Send message
            await socket.emit('sendMessage', message, (response) => {
                this.loading = false
            })
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
        cursor: pointer;
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