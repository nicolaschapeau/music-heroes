<template>
    <div id="container">
        <div id="profil__banner">
        </div>
        <div id="profil__container">
            <div id="profil__header">
                <div class="left">
                    <img v-if="user.avatar" :src="user.avatar" alt="profil_image" />
                    <img v-if="!user.avatar" src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" alt="profil_image" />
                    <div class="text">
                        <h1>{{ user.firstname }} {{ user.lastname.toUpperCase() }}</h1>
                        <div class="like">
                            <i class="icon ion-md-heart"></i>
                            <span>25</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <button class="btn" @click.prevent="createChat(user)">Contacter</button>
                </div>
            </div>
            <div id="profil__content">
                <div id="profil__bio">
                    {{ user.bio }}
                </div>
                <div id="profil__instruments">
                    <ul>
                        <li v-for="instrument in user.instruments" :key="instrument.index">{{ instrument }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'profile',
    data () {
        return {
            user: null,
            _id: null
        }
    },
    async mounted () {
        this.initUser()
    },
    methods: {
        async initUser () {
            this._id = this.$route.params.id
            if(!this._id){
                this.user = this.$store.getters['getUser']
            }else{
                const response = await api.user.getUser(this._id)

                if(response.data.success === true){
                    this.user = response.data.user
                } else {
                    console.error('Erreur : ', response.data.error)
                }
            }
        },
        createChat (userId) {
            this.$parent.$emit('create-tchat', userId._id)
        }
    },
    watch: {
        '$route.params.id' () {
            this.initUser()
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
        width: 200px;
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