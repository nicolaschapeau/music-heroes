import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'
import gameModule from './game'
import serverModule from './server'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth: authModule,
        game: gameModule,
        server: serverModule,
    }
})
