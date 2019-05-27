<template>
    <div id="search">
        <h2>Search</h2>
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
            requests: null
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

    #search{
        text-align: center;
        padding: 25px 150px 25px 150px;
    }

</style>