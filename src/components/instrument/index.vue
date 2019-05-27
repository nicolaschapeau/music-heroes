<template>
    <div>
        <h2>Instrument</h2>  
        <h3>Veuillez choisir les instruments que vous pratiquez</h3>
        <form id="form">
            <div class="list">
                <div v-for="instrument in instruments" :key="instrument.index">
                    <input type="checkbox" :id="instrument" :name="instrument" :value="instrument" v-model="formData">
                    <label class="item" :for="instrument"><p><i class="icon ion-md-checkmark-circle"></i>{{instrument}}</p></label>
                </div>
            </div>
            <input type="submit" class="btn" value="Valider" @click.prevent="sendData">
            <p v-if="error" v-html="error" class="error"></p>
        </form>   
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'Instrument',
    props: ['user', 'instruments'],
    data () {
        return {
            formData: [],
            error: null
        }
    },
    methods: {
        async sendData () {
            if(this.formData){
                let response = await api.user.editUser({
                    "instruments": this.formData
                })

                if(response.data.success){
                    this.$router.push('/')
                } else {
                    this.error = response.data.error
                }
            }
        }
    }
}
</script>

<style scoped>

    #form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h2{
        color: #444;
        text-align: center;
    }

    h3{
        color: #444;
        text-align: center;
    }

    input[type=checkbox]{
        display: none;
    }

    input[type=checkbox], label {
        color: #ccc;
        font-style: italic;
        transition: 0.3s;
    } 
    
    label p {
        margin: 0;
        transition: 0.3s;
    }

    input[type=checkbox]:checked + label p{
        color: #FD8C30;
        font-style: normal;
        padding-left: 5%;
        transition: 0.3s;
        position: relative;
    } 

    .btn{   
        width: 330px;
        margin-top: 15px;
    }

    input[type=checkbox]:checked + label i{
        color: green;
        display: inline;
        padding-right: 10px;
        transition: 0.5s;
    }

    .list{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .item {
        border: 1px solid lightgrey;
        border-radius: 5px;
        padding: 15px;
        margin: 3px 5px;
        display: block;
        cursor: pointer;
        width: 300px;
    }

    .icon{
        display: none;
    }

    .error{
        color: red;
    }

</style>
