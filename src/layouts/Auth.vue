<template>
    <div>
        <div class="default__wrapper">
            <section class="default__main">
                <slot />
            </section>
        </div>
    </div>
</template>

<script>

export default {
}
</script>

<style>
    .default__wrapper{
        background: url('/images/background_default.jpg');
        background-position: right; 
        width: 100%;
        height: 100vh;
        display: flex;
    }

    .default__main{
        width: 480px;
        background:white;
        display: flex;
        padding: 60px 15px;
        justify-content: center;
        align-items: center;
    }
</style>
