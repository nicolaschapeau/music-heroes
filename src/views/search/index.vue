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
            request: this.$route.params.req
        }
    },
    mounted () {
        console.log(this.$route.params.req)
    }

}
</script>

<style>
</style>