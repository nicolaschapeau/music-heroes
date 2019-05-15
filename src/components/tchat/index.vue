<template>
	<div class="tchat" v-if="tchat">
        <div class="tchat__content">
            <div class="tchat__head">
                <p>{{ tchat.name }}</p>
                <i class="icon ion-md-close" @click="closeTchat()"></i>
            </div>
            <div id="messages" class="tchat__messages">
                <messages :messages="messages" />
            </div>
            <button @click="add">test</button>
            <div class="tchat__input">
                <form class="input-container" @submit.prevent=""> 
                    <input class="input-field" type="message" placeholder="Message" v-model="message" name="message" autofocus>
                    <i class="icon ion-md-send"></i>
                </form>
            </div>
        </div>
	</div>
</template>


<script>
import Messages from './messages'
import { setTimeout } from 'timers';

export default {
    name: 'Tchat',
    props: ['tchat'],
    components: {
        Messages
    },
    data() {
        return {
            messages: [] 
        }
    },
    mounted () {
        let date = new Date()
        this.messages = [
            { id: 1, name: 'aaaaaaaa', content: "Bonjourourourourourour1", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date: date.toLocaleDateString("fr-FR") },
            { id: 3, name: 'bbbbbbbb', content: "ezfzefz http://okbutwin.fr fzefzfzefzef", date: date.toLocaleDateString("fr-FR") },
            { id: 4, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 5, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 6, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 7, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 8, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 9, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 10, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 11, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 12, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 13, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 14, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 15, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 16, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 17, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 18, name: 'aaaaaaaa', content: "Bonjourourourourourour3", date: date.toLocaleDateString("fr-FR") }
        ]

        
    },
    methods: {
        closeTchat () {
            this.$emit('close-tchat')
        },
        add(){
            let date = new Date()
            this.messages.push({ id: 19, name: 'aaaaaaaa', content: "Bonjourourourourourour3", date: date.toLocaleDateString("fr-FR") })
        }
    }
}
</script>


<style scoped>

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
        overflow-x: hidden;
        overflow-y: auto;
    }

    .tchat__input{
        width: 100%;
        height: 40px;
    }
</style>