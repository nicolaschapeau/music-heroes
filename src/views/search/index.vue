<template>
    <div id="search">
        <h2>Search</h2>
        <search :request="request"/>
    </div>
</template>

<script>
import Search from '@/components/search'

export default {
    name: 'SearchPage',
    components: {
        Search
    },
    data () {
        return {
            request: null
        }
    },
    mounted () {
        this.setRequest(this.$route.params.req)
    },
    methods: {
        setRequest (request) {
            this.request = request
        }
    },
    watch: {
        '$route.params.req' () {
            this.setRequest(this.$route.params.req)
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