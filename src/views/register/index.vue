<template>
    <div id="container">
        <div class="register__infos">
            <img class="register__logo" src="/images/logo.png">
            <h1 class="register__title">Music Heroes</h1>
        </div>

        <div class="register__type" v-if="stage === null">
            <h4>VOUS ÊTES</h4>
            <div class="register__type___choice">
                <div class="register__type__musician" @click="chooseAccountType(0)">
                    <i class="icon ion-md-musical-notes"></i>
                    <p>Musicien</p>
                </div>
                <div class="register__type__org" @click="chooseAccountType(1)">
                    <i class="icon ion-md-briefcase"></i>
                    <p>Organisateur</p>
                </div>
            </div>

            
            <p>
                Inscrivez-vous ici ou 
                <a class="register__redirect" href="/login">connectez-vous</a>
            </p>
        </div>

        <div class="register__form" v-if="stage === 2">
          
            <div class="register__form__back" @click="changeStage(null)">
                <i class="icon ion-md-arrow-round-back register__form__back"></i>
            </div>

            <form class="form__register">

                <div class="input-container">
                    <i class="icon ion-md-person"></i>
                    <input class="input-field" type="text" placeholder="Nom" v-model="lastname" name="lastname">
                </div>

                <div class="input-container">
                    <i class="icon ion-md-person"></i>
                    <input class="input-field" type="text" placeholder="Prénom" v-model="firstname" name="firstname">
                </div>

                <div class="input-container">
                    <i class="icon ion-md-mail"></i>
                    <input class="input-field" type="text" placeholder="Email" v-model="email" name="email">
                </div>

                <div class="input-container">
                    <i class="icon ion-md-lock"></i>
                    <input class="input-field" type="text" placeholder="Mot de passe" v-model="password" name="password">
                </div>

                <div class="input-container">
                    <i class="icon ion-md-lock"></i>
                    <input class="input-field" type="text" placeholder="Confirmer votre mot de passe" v-model="password_confirm" name="password_confirm">
                </div>

                <button type="submit" class="btn" @click.prevent="validateRegister()">Valider</button>

            </form>

            <p class="register__form__error" v:if="error">{{ error }}</p> 
            
            <p>
                Inscrivez-vous ici ou 
                <a class="register__redirect" href="/login">connectez-vous</a>
            </p>

        </div>

        <div class="register__validate" v-if="stage === 3">
          
            <div class="register__validate__content">
                <i class="icon ion-md-checkmark-circle"></i>
                <h2>Votre compte a bien été inscrit</h2>
                <p>Veuillez valider votre email</p>
                <p>Vous allez être redirigé dans {{ timer }} secondes</p>
            </div>

        </div>

    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'register',
    data () {
        return {
            error: null,
            stage: null,
            typeAccount: null,
            lastname: null,
            firstname: null,
            email: null,
            password: null,
            password_confirm: null,
            timer: null
        }
    },
    methods: {
        chooseAccountType(type) {
            this.typeAccount = type
            this.stage = 2
        },       
        changeStage(number) {
            if (number === null) {
                this.typeAccount = null
            }

            this.stage = number
        },
        async validateRegister() {

            if (!this.typeAccount || !this.lastname || !this.firstname || !this.email || !this.password || !this.password_confirm) {
                return this.error = 'Veuillez remplir tous les champs.'
            }

            if (this.password !== this.password_confirm) {
                return this.error = 'Vos mots de passe doivent correspondrent.'
            }


            let response = await this.$store.dispatch('register', {
                type: this.typeAccount,
                lastname: this.lastname,
                firstname: this.firstname,
                email: this.email,
                password: this.password,
            })

            if (response.success !== true) {
                return this.error = response.message
            } else {
                this.changeStage(3)

                this.timer = 5

                setInterval(() => {
                    this.timer -= 1
                    if(this.timer === 0){
                        return this.$router.push('/')
                    }
                }, 1000)
            }

        }
    }
}
</script>

<style scoped>
    #container {
        width: 70%;
    }

    .register__infos {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 30px;
    }

    .register__title {
        color: #444;
        font-size: 40px;
        margin-top: 185px;
    }

    .register__logo {
        width: 70px;
        position: absolute;
    }

    .form__register {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .input-container {
        margin-bottom: 15px;
    }

    .input-field:focus {
        border: 2px solid #fd8c30;
    }

    .register__type h4 {
        font-size: 20px;
        font-weight: bold;
    }

    .register__redirect {
        color: #fd8c30;
        text-decoration: none;
        transition: 0.3s;
    }

    .register__redirect:hover {
        color: #E7550E;
        transition: 0.3s;
    }

    .register__type___choice {
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
    }

    .register__type__musician, .register__type__org {
        padding: 10px 37px 0 37px;
        width: 80px;
        background: #fd8c30;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 0.3s;
        color:white;
        border-radius: 15px;
        cursor: pointer;
        letter-spacing: 1px;
        font-weight: bold;
    }

    .register__type__musician .icon, .register__type__org .icon {
        font-size: 64px;
        color:white;
        background: none;
    }

    .register__type__musician:hover, .register__type__org:hover {
        transition: 0.3s;
        transform: scale(1.1);
        background: #f37335;
    }

    .register__form__back {
        color: #444;
        background: none;
        font-size: 32px;
        padding-bottom: 15px;
        transition: 0.3s;
        cursor: pointer;
    }

    .register__form__back:hover {
        transition: 0.3s;
        transform: translate(-5px);
    }

    .register__form__error {
        padding: 10px 37px 0 37px;
        color: red;
    }

    .register__validate__content .icon {
        font-size: 64px;
        background: none;
        color: green;
    }
</style>