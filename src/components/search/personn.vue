<template>
    <div>
        <div v-show="!loading" id="search__container" @click="redirect(request._id)">
            <div id="search__header">
                <div class="left">
                    <img :src="avatar" alt="profil_image" />
                    <div class="text">
                        <h2>
                            {{ request.firstname }} {{ request.lastname }} 
                            <i v-if="request.type === 0">(Musicien)</i>
                            <i v-if="request.type !== 0">(Organisateur)</i>
                        </h2>
                        <div class="like">
                            <h3>{{ recommand }} <span>Recommandations</span></h3>
                        </div>
                        <div id="search__bio">
                            {{ request.bio }}
                        </div>
                        <div id="search__instruments">
                            <ul>
                                <li v-show="request.type === 0" v-for="instrument in request.instruments" :key="instrument.index">{{ instrument }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <button class="btn" @click="redirect(request._id)">Voir</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'SearchPersonn',
    props: ['request'],
    data () {
        return {
            avatar: null,
            recommand: 0,
            loading: false
        }
    },
    mounted () {
        this.initUser(this.request)
    },
    methods: {
        redirect (id) {
            this.$router.push('/profil/' + id)
        },
        async initUser (user) {
            this.loading = true
            let rating = await api.rating.get(user._id)
            let avatar = await api.user.getAvatar(user._id)

            if(rating.data.success !== false){
                this.recommand = rating.data.rating.total
            }

            if (avatar.data.success === false) {
                this.avatar = String("https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg")
            } else {                    
                this.avatar = "data:image/png;base64," + String(avatar.data)
            }

            this.loading = false
        },
    },
    watch: {
        'request': function () {
            this.initUser(this.request)
        }
    }
}
</script>

<style scoped>
    #container #search__container {
        cursor: pointer;
        width: 100%;
        flex: 1 auto;
        margin: 50px 0 25px;
        border-radius: 0px;
        transition: 0.3s;
        background: white;
        border-radius: 5px;
        border: 1px solid #eee;
        -webkit-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.2);
        -moz-box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.2);
        box-shadow: 0px 2px 2px 0px rgba(84,110,122,0.2);
    }

    #container #search__container:hover { 
        -webkit-box-shadow: 0px 2px 3px 0px rgba(84,110,122,0.4);
        -moz-box-shadow: 0px 2px 3px 0px rgba(84,110,122,0.4);
        box-shadow: 0px 2px 3px 0px rgba(84,110,122,0.4);
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
        width: 135px;
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

    #search__bio {
        margin-top: 20px;
    }

    #container #search__container #search__content{
        display: flex;
        justify-content: space-between;
        padding: 20px 50px 20px 50px;
    }

    #search__instruments{
        width: 100%;
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
        justify-content: flex-start;
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


.cs-loader {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cs-loader-inner {
  transform: translateY(-50%);
  top: 50%;
  position: absolute;
  width: calc(100% - 200px);
  color: #fd8c30;
  padding: 0 100px;
  text-align: center;
}

.cs-loader-inner label {
  font-size: 20px;
  opacity: 0;
  display:inline-block;
}

@keyframes lol {
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    transform: translateX(0px);
  }
  66% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(300px);
  }
}

@-webkit-keyframes lol {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  66% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(300px);
  }
}

.cs-loader-inner label:nth-child(6) {
  -webkit-animation: lol 1s infinite ease-in-out;
  animation: lol 1s infinite ease-in-out;
}

.cs-loader-inner label:nth-child(5) {
  -webkit-animation: lol 1s 100ms infinite ease-in-out;
  animation: lol 1s 100ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(4) {
  -webkit-animation: lol 1s 200ms infinite ease-in-out;
  animation: lol 1s 200ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(3) {
  -webkit-animation: lol 1s 300ms infinite ease-in-out;
  animation: lol 1s 300ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(2) {
  -webkit-animation: lol 1s 400ms infinite ease-in-out;
  animation: lol 1s 400ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(1) {
  -webkit-animation: lol 1s 500ms infinite ease-in-out;
  animation: lol 1s 500ms infinite ease-in-out;
}
</style>
