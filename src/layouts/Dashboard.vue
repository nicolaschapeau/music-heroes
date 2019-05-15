<template>
    <div>
        <div class="container">
            <dashboard-header class="header" />
            <Sidebar class="sidebar" @open-tchat="openTchat"/>
            <div class="content">
                <slot />
            </div>
            <Tchat class="tchat color-clear" :tchat="tchat" @close-tchat="closeTchat"/>
        </div>
    </div>
</template>

<script>
import dashboardHeader from '@/components/header'
import Sidebar from '@/components/sidebar'
import Tchat from '@/components/tchat'

export default {
    components: {
        dashboardHeader,
        Sidebar,
        Tchat
    },
    data () {
        return {
            tchat: null,
        }
    },
    methods: {
        openTchat(e) {
            this.tchat = e
        },
        closeTchat() {
            this.tchat = null
        }
    }
}
</script>

<style scoped>

    .container{
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
        background: #FCF1E8;
        margin-top: 6px;
        z-index: 4;
        overflow-x: hidden;
        overflow-y: auto;
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
        z-index: 1;        
        overflow-x: hidden;
        overflow-y: auto;
    }

    .header{
        grid-area: header;
        background: white;
        border-bottom: 1px solid lightgrey;
        z-index: 2;
    }


</style>
