<template>
    <div>
        <main id="container" v-show="!loading">
            <div v-if="user">
                <div id="profil__banner" v-bind:style="styleObject"> 
                </div>
                <section id="profil__container">

                    <section id="profil__content">
                        <div id="profil__content__left">
                            <div id="profil__content__picture">
                                <img v-if="avatar" :src="avatar" alt="profil_image" width="200px"/>
                            </div>
                            <div id="profil__content__main">
                                <h1>{{ user.firstname }} {{ user.lastname.toUpperCase() }}</h1>
                                <p> Inscription le {{ user.createdAt | moment("DD/MM/Y") }}</p>
                            </div>
                            <div id="profil__content__recommands">
                                <h2>{{ userReco }} <span v-if="userReco >= 2">recommandations</span><span v-if="userReco < 2">recommandation</span></h2>
                                <p v-if="user.type === 0">Musicien</p>
                                <p v-if="user.type === 1">Organisateur</p>
                            </div>
                        </div>
                        <div id="profil__content__right">
                            <button class="btn recommand" v-if="id && canRecommand" @click.prevent="recommandUser(user)">Recommander</button>
                            <button class="btn edit" v-if="!id && !this.editing" @click.prevent="editUser(user)">Editer mon profil</button>
                            <button class="btn cancel" v-if="!id && this.editing" @click.prevent="editUser(user)">Annuler l'édition</button>
                            <button class="btn" v-if="id" @click.prevent="createChat(user)">Contacter</button>
                        </div>
                    </section>

                    <section id="profil__more">
                        <div id="profil__left__section">
                            <div id="profil__more__bio">
                                <h3>Biographie</h3>
                                <p>{{ user.bio }}</p>
                            </div>
                            <div id="profil__more__instruments" v-if="user.instruments.length > 0">
                                <h3>Instruments</h3>
                                <ul>
                                    <li v-for="instrument in user.instruments" :key="instrument.index">{{ instrument }}</li>
                                </ul>
                            </div>
                        </div>
                        <div id="profil__right__section">
                            <transition name="fade" mode="out-in">
                                <edit-user id="edit__user" v-if="editing" :user="user" @cancelUserEdit="cancelUserEdit()"/>
                                <div id="under__construction" :class="{ active: editing }" v-if="!editing">
                                    <p >Cette zone est en construction elle contriendra d'autres informations utiles sur le profil de l'utilisateur comme le fait de voir l'historique des événements auxquelles il a participé.</p>
                                </div>
                            </transition>
                        </div>
                    </section>
                </section>
            </div>
            
        </main>
        <div v-show="loading" id="search__container">
            <div class="cs-loader">
                <div class="cs-loader-inner">
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/api'
import EditUser from '@/components/editUser'
import moment from 'moment'
import 'moment/locale/fr'

export default {
    name: 'profile',
    components: {
        EditUser
    },
    data () {
        return {
            user: null,
            id: null,
            avatar: null,
            editing: false,
            userReco: 0,
            canRecommand: false,
            styleObject: {
                background: "url(https://image.noelshack.com/fichiers/2019/22/3/1559118305-594608.jpg) no-repeat top/cover",
            },
            loading: false
        }
    },
    async mounted () {
        this.initUser()
    },
    methods: {
        async initUser () {
            this.loading = true
            this.id = this.$route.params.id
            this.user = this.$store.getters['getUser']

            if(this.id){
                if(this.id === this.user._id){
                    this.$router.push('/')
                }
                const response = await api.user.getUser(this.id)

                if(response.data.success === true){
                    this.user = response.data.user
                } else {
                    console.error('Erreur : ', response.data.error)
                }
            }

            let id = this.id ? this.id : this.user._id

            await this.getAvatar(id)
            await this.getBanner(id)
            await this.getReco()
            
            this.loading = false
        },
        async getAvatar(id) {
            const response = await api.user.getAvatar(id)

            if (response.data.success === false) {
                this.avatar = String("https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg")
            } else {
                this.avatar = String("data:image/png;base64," + response.data)
            }
        },
        async getBanner(id) {
            const response = await api.user.getBanner(id)

            if (response.data.success === false) {
                this.styleObject.background = String("url(http://getwallpapers.com/wallpaper/full/5/d/1/594608.jpg) no-repeat top/cover")
            } else {
                this.styleObject.background = String("url(data:image/png;base64," + response.data + ") no-repeat top/cover")
            }
        },
        createChat (user) {
            this.$parent.$emit('create-tchat', user._id)
        },
        editUser(user) {
            if (this.editing) {
                this.editing = null
            } else {
                let userId = user._id

                this.editing = userId
            }
        },
        cancelUserEdit() {
            this.editing = null
        },
        async getReco () {
            let response = await api.rating.get(this.user._id)

            let me = this.$store.getters['getUser']

            if(response.data.rating.users.find(user => user.user === me._id)){
                this.canRecommand = false
            } else {
                this.canRecommand = true
            }

            if(response.data.success === false){
                console.log(response.data.error)
                return
            } else {
                this.userReco = response.data.rating.total
            }
        },
        async recommandUser (user) {
            let response = await api.rating.add({target: user._id})

            if(response.data.success === false){
                console.log(response.data.error)
            } else {
                this.userReco ++
                this.canRecommand = false
            }
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
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    #container #profil__banner{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        width: 100%;
        height: 300px;
        min-height: 300px;
    }
    
    #container #profil__container{
        background: #EFF5F9;
        width: 100%;
        flex: 1 auto;
    }


    #profil__content {
        background: white;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        -webkit-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        -moz-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
    }

    #profil__content #profil__content__left {
        margin-left: 50px;
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        color: #546e7a; 
    }

    #profil__content #profil__content__left img {
        position: relative;
        top: -55px;
        width: 150px;
        border-radius: 50%;
        padding: 4px;
        background: white;
    }


    #profil__content #profil__content__left #profil__content__main {
        margin: 0px 0px 0px 25px;
        padding: 0px 40px 0px 0px;
        border-right: 2px solid #eee;
        height: 50px;
    }

    #profil__content #profil__content__left #profil__content__main h1 {
        letter-spacing: 0.5px;
        margin: 0 0 0 5px;
        font-size: 18px;
    }

    #profil__content #profil__content__left #profil__content__main p {
        margin: 2px 0 5px 5px;
        color: #90a4ae;
    }


    #profil__content #profil__content__left #profil__content__recommands {
        margin: 0px 0px 0px 40px;
        padding: 0px 40px 0px 0px;
        border-right: 2px solid #eee;
        height: 50px;
    }

    #profil__content #profil__content__left #profil__content__recommands h2 {
        margin: 0 0 0 5px;
        font-size: 18px;
    }

    #profil__content #profil__content__left #profil__content__recommands h2 span {
        font-weight: 300;
    }

    #profil__content #profil__content__left #profil__content__recommands p {
        margin: 2px 0 5px 5px;
        color: #90a4ae;
    }



    #profil__content #profil__content__right {
        margin-right: 50px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    button {
        margin: 0 5px 0 5px;
        height: 44px;
        padding: 0px 20px 0px 20px;
        transition: 0.3s;
        border-radius: 32px;
    }

    button.edit {
        background: #03A9F4;
    }
    button.edit:hover {
        background: #0288D1;
    }

    button.recommand {
        background: #E91E63;
    }
    button.recommand:hover {
        background: #C2185B;
    }

    #profil__more {
        color: #546e7a; 
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        height: calc(100vh - 476px);
        min-height: 300px;
    }

    #profil__more #profil__left__section {
        width: 300px;
        margin: 15px;
        padding: 15px;
        color: #546e7a; 
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        flex-wrap: wrap;
    }

    #profil__more #profil__left__section #profil__more__bio {
        width: 100%;
        padding: 15px;
        background: white;
        -webkit-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        -moz-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
    }

    #profil__more #profil__left__section #profil__more__bio h3 {
        margin: 0;
    }

    #profil__more #profil__left__section #profil__more__instruments {
        margin-top: 15px;
        padding: 15px;
        width: 100%;
        background: white;
        -webkit-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        -moz-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
    }

    #profil__more #profil__left__section #profil__more__instruments h3 {
        margin: 0;
    }

    #profil__more #profil__left__section #profil__more__instruments ul {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        margin: 15px 0 0 0;
        padding: 0;
        list-style-type: none;
    }

    #profil__more #profil__left__section #profil__more__instruments ul li {
        margin: 0 5px 5px 0px;
        background: #546e7a;
        border-radius: 5px;
        color: white;
        font-weight: 300;
        padding: 3px 10px 3px 10px;
        font-size: 15px;
    }

    #profil__more #profil__right__section {
        width: auto;
        max-width: calc(100% - 500px);
        padding: 15px;
        color: #546e7a; 
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        flex-wrap: wrap;
    }

    #profil__more #profil__right__section #under__construction {
        top: 0px;
        position: relative;
        margin: 15px 15px 0px 0px;
        padding: 15px;
        background: white;
        -webkit-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        -moz-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        transition: 0.15s;
    }

    #profil__more #profil__right__section #edit__user {
        top: 0px;
        position: relative;
        width: calc(100% - 30px);
        margin: 15px 0px 0px 0px;
        padding: 15px;
        background: white;
        -webkit-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        -moz-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
        box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.1);
    }

    button.cancel {
        margin: 0 5px 0 5px !important;
        height: 44px;
        padding: 0px 20px 0px 20px;
        transition: 0.3s;
        border-radius: 32px;
        outline: none;
        border: none;
        cursor: pointer;
        background: #F44336;
        transition: 0.3s;
        color: white;
        font-size: 13.33px;
        margin: 0;
    }

    button.cancel:hover {
        background: #D32F2F;
    }

    .cs-loader{
        position: absolute;
        top: calc(50% + 20px);
        left: calc(50% + 90px);
    }

    /* #container #profil__container #profil__header{
        height: 200px;
        margin-left: 10%;
        width: 80%;
        display: flex;
        background: white;
        justify-content: space-between;
        align-items: flex-start;        
        position: relative;
        top: -65px;
    }

    #container #profil__container #profil__header .left{
        display: flex;
        align-items: flex-start;
    }

    #container #profil__container #profil__header .left img{
        width: 200px;
    }

    #container #profil__container #profil__header .left .text{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    #container #profil__container #profil__header .left .text h1 {
        margin: 10px 0 5px 0;
        font-weight: 700;
    }

    #container #profil__container #profil__header .left .text h2 {
        margin: 0px 0 5px 0;
        font-weight: 700;
    }

    #container #profil__container #profil__header .left .text h2 span {
        font-weight: 300;
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
    } */

    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>