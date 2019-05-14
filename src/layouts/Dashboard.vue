<template>
    <div>
        <div class="container">
            <dashboard-header class="header" />
            <Sidebar class="sidebar" @open-tchat="openTchat"/>
            <div class="content">
                <slot />
            </div>
            <Tchat class="tchat" :tchat="tchat" @close-tchat="closeTchat"/>
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
        background: red;
        min-width: 400px;
    }

    .tchat{
        grid-area: 3 / 4 / 4 / 7;
        background: blue;
        margin-left: 20px;
    }

    .content{
        grid-area: main;
        background: white;
    }

    .header{
        grid-area: header;
        background: yellow;
    }


</style>
