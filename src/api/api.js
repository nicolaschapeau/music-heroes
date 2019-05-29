const axios = require('axios')

// Axios default url
axios.defaults.baseURL = 'http://localhost:3000'

// Export api calls
export default {
    auth: {
        register: (data) => axios.post('/auth/register', data, { 
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
        fetch: () => axios.get('/auth/fetch', { 
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        validateEmail: (token) => axios.get('/auth/email/' + token, {
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
    chat: {
        create: (data) => axios.post('/chats', data, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        getAll: () => axios.get('/chats/me', {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }), 
        getOne: (id) => axios.get('/chats/' + id, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        sendMessage: (id, data) => axios.post('/chats/' + id, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
    },
    user: {
        getUser: (id) => axios.get('/users/' + id, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        getAvatar: (id) => axios.post('/users/' + id + '/avatar', {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        editUser: (data) => axios.patch('/users/me', data, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),
        setUserAvatar: (data) => axios.post('/users/me/avatar', {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'content-type': 'multipart/form-data'
            },
            data
        }),
        setUserBanner: (data) => axios.post('/users/me/banner', {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'content-type': 'multipart/form-data'
            },
            data
        })
    },
    search: {
        search: (data) => axios.get('/search?query=' + data, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    },   
}