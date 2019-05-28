<template>
    <div>
        <div id="container" v-if="hasInstru === true">
            <dashboard-header class="header" />
            <Sidebar class="sidebar" :user="user" :tchats="loadedLists" @open-tchat="openTchat"/>
            <div class="content">
                <slot />
            </div>
            <Tchat class="tchat color-clear" :user="user" :messages="messages" :roomData="roomData" @close-tchat="closeTchat"/>
        </div>
        <div id="container__instru" v-if="hasInstru === false">
            <dashboard-header class="header" />
            <instrument id="instrument" :user="user" :instruments="instruments" />
        </div>
    </div>
</template>

<script>
import instrument from '@/components/instrument'
import dashboardHeader from '@/components/header'
import Sidebar from '@/components/sidebar'
import Tchat from '@/components/tchat'
import io from 'socket.io-client'
import api from '../api/api'

export default {
    components: {
        instrument,
        dashboardHeader,
        Sidebar,
        Tchat
    },
    data () {
        return {
            user: this.$store.getters['getUser'],
            hasInstru: null,
            roomData: null,
            messages: null,
            socket: io('localhost:3000'),
            instruments: ['Guitare', 'Violon', 'Piano', 'Ukulele', 'Batterie', 'Biniou', 'Harpe', 'Contrebasse', 'Violoncelle', 'Alto', 'Clavecin', 'Synthétiseur', 'Flûte à bec', 'Hautbois', 'Saxophone', 'Trompette', 'Trombone', 'Orgue', 'Tuba', 'Cymbale', 'Maracas', 'Tambour', 'Triangle']
        }
    },    
    async mounted () {
        this.loadData(),
        this.$store.dispatch('setSocket', this.socket)

        this.hasInstru = await this.checkInstru() 

        this.socket.on('receiveMessage', (message) => {
            this.messages.push(message)
        })
    },  
    computed: {
        loadedLists () {
            return this.$store.getters['getChats']
        }
    }, 
    methods: {
        async loadData() {
            await this.$store.dispatch('setChats')
        },
        async openTchat(e) {
            this.roomData = e,
            this.messages = await api.chat.getOne(this.roomData._id)
            this.messages = this.messages.data.messages.reverse()

            this.socket.emit('join', this.roomData._id)
        },
        closeTchat() {
            this.socket.emit('leave', this.roomData._id)

            this.roomData = null
        },
        async checkInstru () {
            let response = await this.$store.getters['getUser']
            
            if (!response) {
                return false
            }

            if (response.type === 0 && response.instruments.length != 0) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>

    #container__instru{
        display: grid;
        grid-template-rows: 70px calc(100vh - 70px);
        grid-template-columns: repeat(12, 1fr);
        grid-template-areas: 
            "header   header  header header header header header header header header header header"
            "instrument instrument instrument instrument instrument instrument instrument instrument instrument instrument instrument instrument";
    }

    #instrument{
        grid-area: instrument;
    }

    #container{
        display: grid;
        grid-template-rows: 70px calc(50vh - 70px) 50vh;
        grid-template-columns: repeat(12, 1fr);
        grid-template-areas: 
            "header   header  header header header header header header header header header header"
            "sidebar sidebar sidebar  main   main   main   main   main   main   main   main   main"
            "sidebar sidebar sidebar  main   main   main   main   main   main   main   main   main";
    }

    .sidebar{
        grid-area: sidebar;
        margin-top: 6px;
        z-index: 4;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .tchat{
        grid-area: 3 / 4 / 4 / 7;
        margin-left: 20px;
        background: #FCF1E8;
        z-index: 3;
    }

    .content{
        grid-area: main;
        background: white;
        margin-top: 6px;
        z-index: 1;        
        overflow-x: hidden;
        overflow-y: auto;
    }

    .header{
        grid-area: header;
        background: white;
        z-index: 2;
    }


</style>
