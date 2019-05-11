<template>
    <div class="register__content">
        <div class="register__infos">
            <img class="register__logo" src="/images/logo.png">
            <h1 class="register__title">Music Heroes</h1>
        </div>

        <div class="register__type" v-if="!typeAccount">
            <h4>VOUS ÊTES</h4>
            <div class="register__choice">
                <div class="register__musician" @click="chooseAccountType('musician')">
                    <i class="icon ion-md-musical-notes"></i>
                    <p>Musicien</p>
                </div>
                <div class="register__org" @click="chooseAccountType('organizer')">
                    <i class="icon ion-md-briefcase"></i>
                    <p>Organisateur</p>
                </div>
            </div>
        </div>

        <div class="register__form" v-if="typeAccount">
          
            <div class="register__back" @click="chooseAccountType(null)">
                <i class="icon ion-md-arrow-round-back register__back"></i>
            </div>

            <form class="form__register">

                <div class="input-container">
                    <i class="icon ion-md-person"></i>
                    <input class="input-field" type="text" placeholder="Nom" name="lastname">
                </div>

                <div class="input-container">
                    <i class="icon ion-md-person"></i>
                    <input class="input-field" type="text" placeholder="Prénom" name="firstname">
                </div>

                <div class="input-container">
                    <i class="icon ion-md-mail"></i>
                    <input class="input-field" type="text" placeholder="Email" name="email">
                </div>

                <div class="input-container">
                    <i class="icon ion-md-lock"></i>
                    <input class="input-field" type="text" placeholder="Mot de passe" name="password">
                </div>

                <div class="input-container">
                    <i class="icon ion-md-lock"></i>
                    <input class="input-field" type="text" placeholder="Confirmer votre mot de passe" name="password_confirm">
                </div>

                <button type="submit" class="btn">Valider</button>

            </form>
        </div>

        <p>
            Inscrivez-vous ici ou 
            <a class="register__redirect" href="/login">connectez-vous</a>
        </p>
    </div>
</template>

<script>

export default {
    name: 'register',
    data () {
        return {
            typeAccount: null
        }
    },
    methods: {
        chooseAccountType(type) {
            this.typeAccount = type
        }
    }
}
</script>

<style>
    .register__content{
        width: 70%;
    }

    .register__infos{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 30px;
    }

    .register__title{
        color: #444;
        font-size: 40px;
        margin-top: 185px;
    }

    .register__logo{
        width: 70px;
        position: absolute;
    }

    .form__register{
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

    .input-container .icon {
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

    .btn {
        background-color: #fd8c30;
        color: white;
        padding: 15px 20px;
        border: none;
        cursor: pointer;
        width: 100%;
        transition: 0.3s;
    }

    .btn:hover {
        background: #f37335;
        transition: 0.3s;
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

    .register__choice{
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
    }

    .register__musician, .register__org{
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

    .register__musician .icon, .register__org .icon {
        font-size: 64px;
        color:white;
        background: none;
    }

    .register__musician:hover, .register__org:hover {
        transition: 0.3s;
        transform: scale(1.1);
        background: #f37335;
    }

    .register__back{
        color: #444;
        background: none;
        font-size: 32px;
        padding-bottom: 15px;
        transition: 0.3s;
    }

    .register__back:hover{
        transition: 0.3s;
        transform: translate(-5px);
    }


</style>