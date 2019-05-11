<template>
    <div class="login__content">
        <div class="login__infos">
            <img class="login__logo" src="/images/logo.png">
            <h1 class="login__title">Music Heroes</h1>
        </div>
        <form class="form__login">

            <div class="input-container">
                <i class="icon ion-md-person"></i>
                <input class="input-field" type="text" placeholder="Nom d'utilisateur ou Email" name="username">
            </div>

            <div class="input-container">
                <i class="icon ion-md-lock"></i>
                <input class="input-field" type="text" placeholder="Mot de passe" name="password">
            </div>

            <button type="submit" class="btn">Connexion</button>

        </form>
        <p>
            Connectez-vous ici ou 
            <a class="login__redirect" href="/register">inscrivez-vous</a>
        </p>
    </div>
</template>

<script>

export default {
    name: 'login'
}
</script>

<style>
    .login__content{
        width: 70%;
    }

    .login__infos{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 50px;
    }

    .login__title{
        color: #444;
        font-size: 40px;
        margin-top: 185px;
    }

    .login__logo{
        width: 70px;
        position: absolute;
    }


    .form__login{
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

    .login__redirect{
        color: #fd8c30;
        text-decoration: none;
        transition: 0.3s;
    }

    .login__redirect:hover {
        color: #E7550E;
        transition: 0.3s;
    }
</style>