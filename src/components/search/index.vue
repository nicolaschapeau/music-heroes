<template>
    <div>
        <div id="container" v-if="requests">
            <div id="search__container" v-for="request in requests" :key="request.index">
                <div id="search__header">
                    <div class="left">
                        <img v-if="request.avatar" :src="request.avatar" alt="profil_image" />
                        <img v-if="!request.avatar" src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" alt="profil_image" />   
                        <div class="text">
                            <h2>
                                {{ request.firstname }} {{ request.lastname }} 
                                <i v-if="request.type === 0" class="icon ion-md-musical-notes"></i>
                                <i v-if="request.type !== 0" class="icon ion-md-briefcase"></i>
                            </h2>
                            <div class="like">
                                <i class="icon ion-md-heart"></i>
                                <span>25</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <button class="btn" @click="redirect(request._id)">Voir</button>
                    </div>
                </div>
                <div id="search__content">
                    <div id="search__bio">
                        {{ request.bio }}
                    </div>
                    <div id="search__instruments">
                        <ul>
                            <li v-for="instrument in request.instruments" :key="instrument.index">{{ instrument }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="container" v-if="!requests || requests.length <= 0">
            <p>Aucun résultat n'est associé à votre recherche</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Search',
    props: ['requests'],
    methods: {
        redirect (id) {
            this.$router.push('/profil/' + id)
        }
    }
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
        margin: 50px 0 25px;
        border-radius: 5px;
        transition: 0.3s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    #container #search__container:hover{
        transition: 0.3s;
        box-shadow: 0 8px 18px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    #container #search__container:hover > #search__header .left img{
        transition: 0.3s;
        transform: scale(1.1);
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
        top: -30px;    
    }

    #container #search__container #search__header .left{
        display: flex;
        align-items: center;
    }

    #container #search__container #search__header .left img{
        transition: 0.3s;
        border: 1px solid lightgrey;    
        width: 100px; 
        position: relative;
        top: -15px;
    }

    #container #search__container #search__header .left .text{
        padding-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #container #search__container #search__header .left .text i{
        font-size: 16px;
    }   
    
    #container #search__container #search__header .left .text h2{
        margin: 0 0 5px 0;
    }

    #container #search__container #search__header .left .text .like{
        cursor: pointer;
    }

    #container #search__container #search__content{
        display: flex;
        justify-content: space-between;
        padding: 20px 50px 20px 50px;
        margin-top: -65px;
    }

    #container #search__container #search__content #search__bio, #container #search__container #search__content #search__instruments{
        width: 47%;
        border-radius: 5px;
        padding: 10px 0;
        text-align: left;
    }

    .btn{
        padding: 10px 25px;
        border-radius: 5px;
    }


</style>
