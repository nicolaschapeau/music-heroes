<template>
    <header>
        <router-link class="header__left" to="/">
            <img class="header__left__logo" src="/images/logo.png">
            <h2 class="header__left__title">Music Heroes</h2>
        </router-link>
        <div class="header__right">
            <ul class="header__right__list">
                <li class="header__right__list__item">
                    <a @click="logout">
                        Déconnexion
                    </a>
                </li>
                <li class="header__right__list__item">
                    <form class="input-container" @submit.prevent="research">
                        <input class="input-field" type="search" placeholder="Recherche" v-model="search" name="search" required>
                        <i class="icon ion-md-search" @click="research"></i>
                        <!-- <input class="input-field" type="search" placeholder="Recherche" v-model="search" name="search" required>
                        <i class="icon ion-md-search" @click="research"></i> -->
                    </form>
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
        width: 600px;
        display: flex;
        flex-direction: row;
        justify-content: center;
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
        border: none;
        border-bottom: 1px solid #eee;
        width: 250px;
        height: 46px;
        font-size: 15px;
    }
    form input:focus {
        border: none;
        border-bottom: 1px solid #ccc;
    }
    form i {
        margin-left: 10px;
        border-radius: 5px;
        font-size: 20px;
        transition: 0.3s;
    }
    form i:hover {
        background: #f37335; 
    }

</style>
