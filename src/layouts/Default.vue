<template>
    <div>
        <dashboard-header class="header" />
        <div class="default__wrapper" v-if="loading == null || loading == false">
            <section class="default__main">
                <slot />
            </section>
        </div>
    </div>
</template>

<script>
import dashboardHeader from '@/components/header'

export default {
    components: {
        dashboardHeader,
    },
    computed: {
        loading () {
            console.log(this.$store.getters['getLoading'])
            return this.$store.getters['getLoading']
        }
    }
}
</script>

<style>
    .default__wrapper{
        background: url('/images/background_default.jpg');
        background-position: right; 
        width: 100%;
        height: 100vh;
        display: flex;
        /* justify-content: center;
        align-items: center; */
    }

    .default__main{
        width: 25%;
        background:white;
        display: flex;
        padding: 60px 15px;
        justify-content: center;
        align-items: center;
    }

    /* tablets and desktop */
    @media only screen and (min-width: 768px) {
    
    }

    /* phones */
    @media only screen and (max-width: 767px) {
        
    }

    /* portrait phones */
    @media only screen and (max-width: 767px) and (orientation: portrait) {
        
    }
</style>
