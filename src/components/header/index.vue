<template>
    <header>
        <router-link class="header__left" to="/">
            <img class="header__left__logo" src="/images/logo.png">
            <h2 class="header__left__title">Music Heroes</h2>
        </router-link>
        <div class="header__right">
            <ul class="header__right__list"> 
                <li class="header__right__list__item" >
                    <router-link to="/profil">
                        Profil
                    </router-link>
                </li>
                <li class="header__right__list__item">
                    <a @click="logout">
                        Déconnexion
                    </a>
                </li>
                <li class="header__right__list__item">
                    <form class="input-container" @submit.prevent="research">
                        <input class="input-field" type="search" placeholder="Recherche" v-model="search" name="search" required>
                        <i class="icon ion-md-search" @click="research"></i>
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
    header{
        height: 75px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .header__left{
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        color: #444;
        padding-left: 40px;
    }

    .header__right{
        width: 50%;
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
        justify-content: space-around;
        align-items: center;
        width: 100%;
        list-style: none;
        padding: 0;
    }

    .header__right__list__item a{
        text-decoration: none;
        color: #444;
        padding: 15px 10px;
        transition: 0.3s;
        cursor: pointer;
    }

    .header__right__list__item a:hover{
        transition: 0.3s;
        color: #fd8c30;
    }

    .header__right__list .selected a{
        color: #fd8c30;
    }

    .input-field:focus {
        border: 2px solid #fd8c30;
        border-right: 0;
        margin-left:-1px; 
    }
</style>
