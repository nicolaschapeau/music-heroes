<template>
    <div>
        <div id="container" v-if="requests">
            <personn id="search__container" v-for="request in requests" :key="request.index" :request="request"/>
        </div>
        <div id="container" v-if="!requests || requests.length <= 0">
            <p>Aucun résultat n'est associé à votre recherche</p>
        </div>
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
    }
}
</script>

<style scoped>
    

</style>
