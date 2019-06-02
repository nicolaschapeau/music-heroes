<template>
    <header>
        <router-link class="header__left" to="/">
            <img class="header__left__logo" src="/images/logo.png">
            <h2 class="header__left__title">Music Heroes</h2>
        </router-link>
        <div class="header__right">
            <ul class="header__right__list">
                <!-- <li class="header__right__list__item">
                    <a @click="logout">
                        Déconnexion
                    </a>
                </li> -->
                <li class="header__right__list__item">
                    <form class="input-container" @submit.prevent="research">
                        <input class="input-field" type="search" placeholder="Recherche" v-model="search" name="search" required>
                        <i class="icon ion-md-search" @click="research"></i>
                        <!-- <input class="input-field" type="search" placeholder="Recherche" v-model="search" name="search" required>
                        <i class="icon ion-md-search" @click="research"></i> -->
                    </form>
                </li>
                <li id="button__container">
                    <button @click="logout">Déconnexion</button>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
export default {
    name: 'dashboardHeader',
    data () {
        return {
            search: null,
        }
    },
    methods: {
        research() {
            if(this.search){
                this.$router.push('/search/' + this.search)
            }
        },
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
::-webkit-search-decoration,
::-webkit-search-cancel-button,
::-webkit-search-results-button,
::-webkit-search-results-decoration { 
  display: none; 
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}

    header{
        height: 75px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
    }

    .header__left {
        width: 200px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        color: black;
        padding-left: 40px;
    }

    .header__left h2 {
        font-weight: 300;
    }

    .header__right{
        padding-right: 50px;
        width: 450px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .header__left__logo{
        width: 40px;
        padding-right: 15px;
    }

    .container{
        width: 100%;
        overflow: hidden;
    }

    .header__right__list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        list-style: none;
        padding: 0;
    }

    .header__right__list__item a {
        font-size: 16px;
        text-decoration: none;
        color: black;
        -webkit-transition: 0.25s ease-out;
        transition: 0.25s ease-out;
        cursor: pointer;
    }

    .header__right__list__item a:hover {
        color: #444;
    }

    .header__right__list .selected a{
        color: #fd8c30;
    }

    form {
        width: 300px;
        display: flex;
        justify-content: row;
        align-items: center;
    }
    form input {
        border: 1px solid #eee;
        border-right: 0;
        border-radius: 32px 0 0 32px;
        width: 250px;
        height: 44px;
        font-size: 15px;
        padding-left: 20px;
    }
    form i {
        color: white !important;
        border-radius: 0 32px 32px 0;
        font-size: 20px;
        transition: 0.3s;
        background: #FD8C30 !important;
    }
    form i:hover {
        background: #E7550E !important;
    }

    #button__container {
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .input-container .icon {
        border-radius: 0px 32px 32px 0px;
    }

    #button__container button {
        cursor: pointer;
        color: #9E9E9E;
        padding: 0px 25px 0px 25px;
        height: 44px;
        border-radius: 5px;
        box-shadow: none;
        outline: none;
        border: none;
        border: 1px solid #9E9E9E;
        background: white;
        transition: 0.3s;
        border-radius: 32px;
        font-weight: 500;
    }

    #button__container button:hover {
        color: white;
        border: 1px solid #616161;
        background: #616161;
    }

</style>
