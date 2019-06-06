<template>
    <div id="search">
        <h2>Recherche</h2>
        <search :requests="requests"/>
    </div>
</template>

<script>
import Search from '@/components/search'
import api from '@/api/api'

export default {
    name: 'SearchPage',
    components: {
        Search
    },
    data () {
        return {
            requests: false
        }
    },
    mounted () {
        this.setRequests(this.$route.params.req)
    },
    methods: {
        async setRequests (requests) {
            let response = await api.search.search(requests)
            this.requests = response.data
        }
    },
    watch: {
        '$route.params.req' () {
            this.setRequests(this.$route.params.req)
        }
    }
}
</script>

<style scoped>

    .loader__container {
        width: 100%;
        height: 300px;
    }

    #search{
        text-align: center;
        padding: 0px 150px 25px 150px;
    }

    h2 {
        font-weight: 300;
    }

</style>