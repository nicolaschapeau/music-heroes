<template>
    <div class="default__wrapper">
        <section class="default__main">
            <slot />
        </section>
    </div>
</template>

<script>
export default {
    mounted () {
        console.log('t2')
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
