<template>
    <div>
        <h1>Verification...</h1>
        <h2>{{ message }}</h2>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'verify',
    data () {
        return {
            token: this.$route.query.token,
            message: null
        }
    },
    mounted () {
        this.validateEmail(this.token)
    },
    methods: {
        async validateEmail () {
            try {
                const response = await api.auth.validateEmail(this.token)

                if (response.data.success !== true) {
                    throw new Error('Validation de l\'email échoué.')
                }

                this.message = 'Email validé !'
                this.$router.push('/')
            } catch (e) {
                this.message = e
            }
        }
    }
}
</script>

<style></style>