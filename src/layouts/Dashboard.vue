<template>
    <div>
        <Header />
        <div class="container">
            <Tchats class="tchats__bar"/>
            <div class="tchat"></div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
import Tchats from '@/components/tchats'

export default {
    components: {
        Header,
        Tchats
    },
}
</script>

<style scoped>

    .container{
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: calc(50vh - 75px) 50vh;
    }

    .tchats__bar{
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        background: red;
    }

    .tchat{
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        background: blue;
    }

</style>
