const axios = require('axios')

// Axios default url
axios.defaults.baseURL = 'http://localhost:3000'

// Export api calls
export default {
    auth: {
        register: (data) => axios.post('/users', data, { 
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        login: (data) => axios.post('/auth/login', data, { 
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        fetch: () => axios.get('/auth/login/me', { 
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        logout: () => axios.get('/auth/logout', { 
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    },
    server: {
        getServers: () => axios.get('/servers/'),
        getServer: (id) => axios.get('/servers/' + id),
        add: (data) => axios.post('/servers', data),
        remove: (id) => axios.delete('/servers/' + id),
        reset: (id) => axios.get('/servers/' + id + '/reset'),
        changeStatus: (id) => axios.patch('/servers/' + id + '/status')
    }
}