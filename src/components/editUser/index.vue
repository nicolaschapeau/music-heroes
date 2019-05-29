<template>
    <form @submit.prevent="editAccount()">
        <h3>Edition du compte</h3>
        <div class="row">
            <div class="item">
                <label for="firstname">Prénom</label>
                <input type="text" id="lastname" name="firstname" class="input" v-model="firstname">
            </div>
            <div class="item">
                <label for="firstname">Nom</label>
                <input type="text" id="firstname" class="input" name="lastname" v-model="lastname">
            </div>
        </div>
        <div class="row">
            <div class="item">
                <label for="bio">Biographie</label>
                <textarea name="bio" id="bio" cols="30" rows="10" maxlength="600" v-model="bio"></textarea>
            </div>
        </div>
        <div class="row last">
            <div class="item">
                <input type="file" name="profil" class="upload" id="profil" v-on:change="handleProfileUpload()">
                <label for="profil">Photo de profil</label>
            </div>
            <div class="item">
                <input type="file" name="banner" class="upload" id="banner" v-on:change="handleBannerUpload()">
                <label for="banner">Bannière</label>
            </div>
        </div>
        <div class="row" v-if="this.error">
            <div class="item">
                <div class="error">
                    <p>Vos modifications sont invalides.</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="item">
                <button class="submit">Mettre à jour</button>
            </div>
            <div class="item">
                <button class="cancel" @click="cancel()">Annuler</button>
            </div>
        </div>
    </form>
</template>



<script>
import api from '@/api/api'

export default {
    props: ['user'],
    data () {
        return {
            error: null,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            bio: this.user.bio,
            profil: '',
            banner: ''
        }
    },
    mounted () {
    },
    methods: {
        async editAccount() {
            this.error = null

            let data = {
                firstname: this.firstname,
                lastname: this.lastname,
                bio: this.bio
            }

            
            console.log(api)    

            if (profil) {
                let formData = new FormData()
                
                formData.append('avatar', this.profil, 'avatar')
                let response = await api.user.setUserAvatar(formData)
                console.log(response)
                return
            }

            if (banner) {
                let formData = new FormData()

                formData.append('banner', this.banner, 'banner')
            }

            let response = await api.user.setUserBanner(formData)
            
            if (!response.data.success) {
                return this.error = true
            }

            this.$router.go('/')
        },
        handleProfileUpload(){
            this.profil = event.target.files[0];
        },
        handleBannerUpload(){
            this.banner = event.target.files[0];
        },
        cancel() {
            this.$emit('cancelUserEdit')
        }
    }
}
</script>



<style scoped>
.last {
    margin-bottom: 10px;
}

.row {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
}

.item {
    margin-right: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
}

.error {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 32px;
    color: white;
    height: 44px;
    padding: 0px 20px 0px 20px;
    background: #F44336;
}

.error p {
    font-size: 14px;    
}

form {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 10px;
    font-family: 'Roboto', sans-serif;
}

form h3 {
    margin: 0 0 10px 0;
}

form label {
    margin: 2px 0 5px 0;
}

form .input {
    border: 1px solid #ccc;
    border-radius: 32px;
    height: 28px;
    outline: none;
    padding-left: 16px;
    width: 150px;
}

form input.upload {
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

form input.upload + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background: #9E9E9E;
    display: inline-block;
    transition: 0.3s;
    cursor: pointer;
    border-radius: 32px;
    font-size: 14px;
    font-weight: 300;
    padding: 14px 15px 14px 15px;
}

form input.upload:focus + label,
form input.upload + label:hover {
    background: #757575;
}

form textarea {
    border: 1px solid #ccc;
    border-radius: 16px;
    height: 28px;
    outline: none;
    padding: 16px;
    width: 318px;
    height: 150px;
    resize: none;
    font-family: 'Roboto', sans-serif;;
}

button.submit {
    margin: 0 5px 0 5px;
    height: 44px;
    padding: 0px 20px 0px 20px;
    transition: 0.3s;
    border-radius: 32px;
    outline: none;
    border: none;
    cursor: pointer;
    background: #4CAF50;
    transition: 0.3s;
    color: white;
    font-size: 14px;
    margin: 0;
}

button.submit:hover {
    background: #388E3C;
}

button.cancel {
    margin: 0 5px 0 5px;
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
    font-size: 14px;
    margin: 0;
}

button.cancel:hover {
    background: #D32F2F;
}
</style>
