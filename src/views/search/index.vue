<template>
    <div>
        <h1>Search page</h1>
        <p>{{ request }}</p>
    </div>
</template>

<script>
export default {
    name: 'search',
    data () {
        return {
            request: null
        }
    },
    mounted () {
        console.log(this.$route.params.req)
    },
    watch: {
        '$route.params.req' () {
            this.request = this.$route.params.req
        }
    }
}
</script>

<style>
</style>