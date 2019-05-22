<template>
    <div id="container">
        <div id="search__container" v-for="n in 10" :key="n.index">
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
                    <button class="btn" @click="redirect('5ce2fc4f43ed89362804e83f')">Voir</button>
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
    props: ['request'],
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
        cursor: pointer;
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
