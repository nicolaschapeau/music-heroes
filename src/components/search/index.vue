<template>
    <div>
        <div id="container" v-if="requests">
            <div id="search__container" v-for="request in requests" :key="request.index">
                <div id="search__header">
                    <div class="left">
                        <img v-if="request.avatar" :src="request.avatar" alt="profil_image" />
                        <img v-if="!request.avatar" src="https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg" alt="profil_image" />   
                        <div class="text">
                            <h2>
                                {{ request.firstname }} {{ request.lastname }} 
                                <i v-if="request.type === 0" class="icon ion-md-musical-notes"></i>
                                <i v-if="request.type !== 0" class="icon ion-md-briefcase"></i>
                            </h2>
                            <div class="like">
                                <h3>25 <span>Recommandations</span></h3>
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
                            <li>Instrument</li>
                            <li>Instrument</li>
                            <li>Instrument</li>
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
    
    #container #search__container {
        cursor: pointer;
        width: 100%;
        flex: 1 auto;
        margin: 50px 0 25px;
        border-radius: 0px;
        transition: 0.3s;
        -webkit-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        -moz-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
    }

    #container #search__container:hover {
        -webkit-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.4);
        -moz-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.4);
        box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.4);
    }

    #container #search__container #search__header {
        display: flex;
        padding: 20px 50px 20px 50px;
    }

    #container #search__container #search__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;   
        position: relative;  
    }

    #container #search__container #search__header .left{
        display: flex;
        align-items: flex-start;
    }

    #container #search__container #search__header .right{
        display: flex;
        align-items: flex-start;
    }

    #container #search__container #search__header .left img{
        position: relative;
        width: 100px;
        border-radius: 0px;
    }

    #container #search__container #search__header .left .text{
        padding-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    #container #search__container #search__header .left .text i{
        font-size: 16px;
    }   
    
    #container #search__container #search__header .left .text h2{
        margin: 0 0 5px 0;
        font-weight: 300;
    }

    #container #search__container #search__header .left .text h3 {
        margin: 0 0 5px 0;
    }

    #container #search__container #search__header .left .text h3 span {
        margin: 0 0 5px 0;
        font-weight: 300;
    }

    #container #search__container #search__header .left .text .like{
        cursor: pointer;
    }

    #container #search__container #search__content{
        display: flex;
        justify-content: space-between;
        padding: 20px 50px 20px 50px;
    }

    #container #search__container #search__content #search__bio, #container #search__container #search__content #search__instruments{
        width: 47%;
        border-radius: 5px;
        padding: 10px 0;
        text-align: left;
    }

    .btn{
        transition: 0.3s;
        padding: 10px 25px;
        border-radius: 50px;
    }

    #search__instruments ul {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        flex-wrap: wrap;
        margin: 0 0 0 0;
        padding: 0;
        list-style-type: none;
    }

    #search__instruments ul li {
        margin: 0 5px 5px 0px;
        background: #546e7a;
        border-radius: 5px;
        color: white;
        font-weight: 300;
        padding: 3px 10px 3px 10px;
        font-size: 15px;
    }


</style>
