<template>
    <div id="error__container">
        <img id="error__icon" src='images/404.png'>
        <p>La page que vous avez demandé n'existe pas</p>
        <a href="/">Cliquez ici</a> <span>pour retourner sur votre profil</span>
    </div>
</template>

<script>
export default {
    name: 'error'
}
</script>

<style scoped>

    #error__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }
    
    #error__icon{
        margin-top: 5%;
        width: 50%;
    }

</style>