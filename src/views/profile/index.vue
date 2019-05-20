<template>
    <div class="profil">
        <div class="head">
        </div>
        <div class="body">
            <div class="personnal">
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
            <div class="infos">
                <div>Bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo voluptatem praesentium explicabo voluptatibus, error debitis eum eaque nisi pariatur mollitia aliquid, sapiente non impedit architecto earum officiis consequuntur autem?</div>
                <div>Instruments</div>
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

    .profil{
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        /* align-items: center; */
        height: 100%;
    }

    .profil .head{
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
    
    .profil .body{
        width: 100%;
        flex: 1 auto;
    }

    .profil .body .personnal, .profil .body .infos{
        display: flex;
        padding: 20px 50px 20px 50px;
    }

    .profil .body .personnal{
        display: flex;
        justify-content: space-between;
        align-items: center;        
        position: relative;
        top: -65px;
    }

    .profil .body .personnal .left{
        display: flex;
        align-items: center;
    }

    .profil .body .personnal .left img{
        border: 1px solid lightgrey;    
    }

    .profil .body .personnal .left .text{
       padding-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .profil .body .personnal .left .text i{
        font-size: 32px;
    }

</style>