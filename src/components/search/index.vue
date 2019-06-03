<template>
    <div>
        <div id="container" v-if="!norequest">
            <personn v-for="request in requests" :key="request.index" :request="request"/>
        </div>
        <p v-if="norequest">Aucun résultat.</p>
    </div>
</template>

<script>
import api from '@/api/api'
import Personn from '@/components/search/personn'

export default {
    name: 'Search',
    props: ['requests'],
    components: {
        Personn
    },
    data () {
        return {
            norequest: false,
            data: null,
        }
    },
    mounted () {
        this.checkRequest()
    },
    methods: {
        checkRequest () {
            if(!this.requests || this.requests.length === 0){
                this.norequest = true
            } else {
                this.norequest = false
            }
        }
    },
    watch: {
        'requests': function () {
            this.checkRequest()
        }
    }
}
</script>

<style scoped>

</style>
