export default function auth ({ next, router }) {
    console.log('User must me logged in !')
    // return router.push({ name: 'login' })

    return next()
}