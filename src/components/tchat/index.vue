<template>
	<div class="tchat" v-if="roomData">
        <div class="tchat__content">
            <div class="tchat__head">
                <p @click="pushToProfile()">{{ getName(roomData) }}</p>
                <i class="icon ion-md-close" @click="closeTchat()"></i>
            </div>
            <div class="tchat__messages" id="messageContainer">
                <messages :messages="messages" :user="user" />
            </div>
            <div class="tchat__input">
                <form class="input-container" @submit.prevent="createMessage()"> 
                    <input class="input-field" type="message" placeholder="Message" v-model="message" name="message" autofocus autocomplete="off">
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
        pushToProfile() {
            const target = this.roomData.users.find(user => user.user !== this.user._id)
            this.$router.push('/profil/' + target.user)
        },
        closeTchat () {
            this.$emit('close-tchat')
        },
        getName(roomData) {
            const response = roomData.users.find(user => user.user !== this.user._id)
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
                user: this.user
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

    .tchat {
        background: none;
        border-bottom: 0;
    }

    .tchat__content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 8px 8px 0 0 !important;
        border: none;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        margin: 0;
        padding: 0;
    }

    .tchat__head {
        border-radius: 8px 8px 0 0 !important;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ededed;
        width: 100%;
    }

    .tchat__head p {
        font-weight: bold;
    }

    .tchat__head p, .tchat__head i {
        margin: 0;
        padding: 16px;
    }

    .tchat__head i {
        cursor: pointer;
    }

    .tchat__messages {
        width: 100%; 
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background: white;
    }

    .tchat__input {
        width: 100%;
        height: 40px;
        border-bottom: none;
    }
    .input-container .input-field {
        border-radius: 0 0 0 0;
        border: none;
        border-top: 1px solid #dedede;
        border-bottom: none;
    }

    .input-container .icon {
        border-radius: 0 0 0 0;
        border-bottom: 0;    
    }
</style>