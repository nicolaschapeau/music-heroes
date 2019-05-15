<template>
	<div class="tchat" v-if="tchat">
        <div class="tchat__content">
            <div class="tchat__head">
                <p>{{ tchat.name }}</p>
                <i class="icon ion-md-close" @click="closeTchat()"></i>
            </div>
            <div class="tchat__messages">
                <messages :messages="messages" />
            </div>
            <div class="tchat__input">
                <form class="input-container" @submit.prevent=""> 
                    <input class="input-field" type="message" placeholder="Message" v-model="message" name="message">
                    <i class="icon ion-md-send"></i>
                </form>
            </div>
        </div>
	</div>
</template>


<script>
import Messages from './messages'

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
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 2, name: 'bbbbbbbb', content: "Bonjourourourourourour2", date: date.toLocaleDateString("fr-FR") },
            { id: 3, name: 'aaaaaaaa', content: "Bonjourourourourourour3", date: date.toLocaleDateString("fr-FR") }
        ]
    },
    methods: {
        closeTchat () {
            this.$emit('close-tchat')
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
        background: orange;
        width: 100%;
    }

    .tchat__head p, .tchat__head i{
        margin: 0;
        padding: 16px;
    }

    .tchat__head i {
        cursor: pointer;
    }

    .tchat__messages{
        background: orangered;
        width: 100%; 
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .tchat__input{
        background: brown;
        width: 100%;
        height: 40px;
    }

    .input-container {
        display: -ms-flexbox;
        display: flex;
        width: 100%;
    }

    .input-container .icon {
        padding: 10px 0;
        background: #fd8c30;
        color: white;
        min-width: 50px;
        text-align: center;
        cursor: pointer;
    }

    .input-field {
        width: 100%;
        padding: 10px;
        outline: none;
        border: 1px solid #fd8c30;
        border-right: 0;
    }
</style>