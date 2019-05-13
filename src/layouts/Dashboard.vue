<template>
    <div>
        <div class="container">
            <Header class="header" />
            <Sidebar class="sidebar" />
            <div class="content"></div>
            <div class="tchat"></div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

export default {
    components: {
        Header,
        Sidebar
    },
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
