<template>
    <div id="container">
        <div id="profil__banner">
        </div>
        <div id="profil__container">
            <div id="profil__header">
                <div class="left">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mGkC5SE_lbvQcfEba5GevCMNDRXTvOeHsd5UOXQ2zZs4zHHC" alt="profil_image" />
                    <div class="text">
                        <h1>Jascques DUBOIS</h1>
                        <div class="stars">
                            <i class="icon ion-md-star"></i>
                            <i class="icon ion-md-star"></i>
                            <i class="icon ion-md-star"></i>
                            <i class="icon ion-md-star"></i>
                            <i class="icon ion-md-star-outline"></i>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <button class="btn">Contacter</button>
                </div>
            </div>
            <div id="profil__content">
                <div id="profil__bio">
                    Bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo voluptatem praesentium explicabo voluptatibus, error debitis eum eaque nisi pariatur mollitia aliquid, sapiente non impedit architecto earum officiis consequuntur autem?
                </div>
                <div id="profil__instruments">
                    Instruments
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profile'
}
</script>

<style scoped>

    #container{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    #container #profil__banner{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 250px;
        background: url(http://viviendarealestate.com/wp-content/uploads/2017/01/cropped-manor-house-1638766_1280.jpg) no-repeat;
        background-size: cover;
        min-height: 250px;
    }
    
    #container #profil__container{
        width: 100%;
        flex: 1 auto;
    }

    #container #profil__container #profil__header{
        display: flex;
        padding: 20px 50px 20px 50px;
    }

    #container #profil__container #profil__header{
        display: flex;
        justify-content: space-between;
        align-items: center;        
        position: relative;
        top: -65px;
    }

    #container #profil__container #profil__header .left{
        display: flex;
        align-items: center;
    }

    #container #profil__container #profil__header .left img{
        border: 1px solid lightgrey;    
    }

    #container #profil__container #profil__header .left .text{
        padding-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #container #profil__container #profil__header .left .text i{
        font-size: 32px;
    }

    #container #profil__container #profil__content{
        display: flex;
        justify-content: space-between;
        padding: 20px 50px 20px 50px;
    }

    #container #profil__container #profil__content #profil__bio, #container #profil__container #profil__content #profil__instruments{
        width: 47%;
        border: 1px solid lightgrey;
        border-radius: 5px;
        padding: 10px;
    }

</style>