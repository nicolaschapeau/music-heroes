<template>
    <div id="container">
        <div id="search__container">
            <div id="search__header">
                <div class="left">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mGkC5SE_lbvQcfEba5GevCMNDRXTvOeHsd5UOXQ2zZs4zHHC" alt="profil_image" />
                    <div class="text">
                        <h2>Benjamin BENOIT <i class="icon ion-md-musical-notes"></i></h2>
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
                    <button class="btn">Voir</button>
                </div>
            </div>
            <div id="search__content">
                <div id="search__bio">
                    bonsoiruhfzeiuh iuzeh fuze uhfuhieuhfizuehfi uzhfuzeh iuzhef iuzehihfzeiu fhzieuhfizuhfi zuhfiuzehf iuzehf iuzehfi uzhf izhf iuz z efzefzefzefz efzefzefzef erg rg q gqe g qrgqergqeg 
                </div>
                <div id="search__instruments">
                    <ul>
                        <!-- <li v-for="instrument in user.instruments" :key="instrument.index">{{ instrument }}</li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div id="search__container">
            <div id="search__header">
                <div class="left">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mGkC5SE_lbvQcfEba5GevCMNDRXTvOeHsd5UOXQ2zZs4zHHC" alt="profil_image" />
                    <div class="text">
                        <h2>Benjamin BENOIT <i class="icon ion-md-musical-notes"></i></h2>
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
                    <button class="btn">Voir</button>
                </div>
            </div>
            <div id="search__content">
                <div id="search__bio">
                    bonsoiruhfzeiuh iuzeh fuze uhfuhieuhfizuehfi uzhfuzeh iuzhef iuzehihfzeiu fhzieuhfizuhfi zuhfiuzehf iuzehf iuzehfi uzhf izhf iuz z efzefzefzefz efzefzefzef erg rg q gqe g qrgqergqeg 
                </div>
                <div id="search__instruments">
                    <ul>
                        <!-- <li v-for="instrument in user.instruments" :key="instrument.index">{{ instrument }}</li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Search',
    props: ['request']
}
</script>

<style scoped>
    #container{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    
    #container #search__container{
        width: 100%;
        flex: 1 auto;
        margin-top: 50px;
        border-radius: 5px;
        border: 1px solid lightgrey
    }

    #container #search__container #search__header{
        display: flex;
        padding: 20px 50px 20px 50px;
    }

    #container #search__container #search__header{
        display: flex;
        justify-content: space-between;
        align-items: center;        
        position: relative;
        top: -65px;
    }

    #container #search__container #search__header .left{
        display: flex;
        align-items: center;
    }

    #container #search__container #search__header .left img{
        border: 1px solid lightgrey;    
        width: 200px;
    }

    #container #search__container #search__header .left .text{
        padding-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #container #search__container #search__header .left .text i{
        font-size: 32px;
    }

    #container #search__container #search__content{
        display: flex;
        justify-content: space-between;
        padding: 20px 50px 20px 50px;
        margin-top: -65px;
    }

    #container #search__container #search__content #search__bio, #container #search__container #search__content #search__instruments{
        width: 47%;
        border: 1px solid lightgrey;
        border-radius: 5px;
        padding: 10px;
    }

</style>
