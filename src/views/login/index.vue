<template>
    <div id="container">
        <div id="login__infos">
            <img id="login__logo" src="/images/logo.png">
            <h1 id="login__title">Music Heroes</h1>
        </div>
        <form id="form__login">

            <div class="input-container">
                <i class="icon ion-md-person"></i>
                <input class="input-field" type="email" placeholder="Email" v-model="email" name="email" autofocus>
            </div>

            <div class="input-container">
                <i class="icon ion-md-lock"></i>
                <input class="input-field" type="password" placeholder="Mot de passe" v-model="password" name="password">
            </div>

            <button type="submit" class="btn" @click.prevent="validateLogin()">Connexion</button>

            <p id="login__form__error" v:if="error">{{ error }}</p> 
        </form>
        <p>
            Connectez-vous ici ou 
            <a id="login__redirect" href="/register">inscrivez-vous</a>
        </p>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'login',
    data () {
        return {
            error: null,
            email: null,
            password: null
        }
    },
    mounted () {
        if(this.$route.query.error === 0){
            this.error = 'Impossible de verifié le token'
        } else if (this.$route.query.error === 1) {
            this.error = 'Vous devez verifier votre email'
        } else if (this.$route.query.error === 2) {
            this.error = 'Une erreur est survenue, veuillez vous reconnecter'
        }
    },
    methods: {
        async validateLogin() {

            if (!this.email || !this.password) {
                return this.error = 'Veuillez remplir tous les champs.'
            }

            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                if (response.success === false) {
                    return this.error = response.message
                } else {
                    return this.$router.push('/')   
                }
            })
            .catch((error) => {
                return this.error = error.response.data
            })

        }
    }
}
</script>

<style scoped>
    #container{
        width: 70%;
    }

    #container p{
        text-align: center;
    }

    #login__infos{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 50px;
    }

    #login__title{
        color: #444;
        font-size: 40px;
        margin-top: 185px;
    }

    #login__logo{
        width: 70px;
        position: absolute;
    }


    #form__login{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .input-container {
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        margin-bottom: 15px;
    }

    .icon {
        padding: 10px 0;
        background: #fd8c30;
        color: white;
        min-width: 50px;
        text-align: center;
    }

    .input-field {
        width: 100%;
        padding: 10px;
        outline: none;
    }

    .input-field:focus {
        border: 2px solid #fd8c30;
    }

    #login__redirect{
        color: #fd8c30;
        text-decoration: none;
        transition: 0.3s;
    }

    #login__redirect:hover {
        color: #E7550E;
        transition: 0.3s;
    }

    #login__form__error {
        padding: 10px 37px 0 37px;
        color: red;
    }

</style>