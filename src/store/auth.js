import axios from 'axios'
import {Loading, Notify, Cookies, LocalStorage, QSpinnerPie} from 'quasar'
const state = {
    user: null,
    isLoggedIn: null,
    role: null
}

const getters = {
    user(state){
        return state.user
    },
    userRole(state){
        return state.role
    },
    isLoggedIn(state){
        return state.isLoggedIn
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user;
        state.isLoggedIn = true;
        state.role = user.role
    },
    clearUser(state, {user}){
        state.user = user,
        state.isLoggedIn = false
    }
}

const actions = {
    async login({commit, dispatch}, data) {
        try{
            Loading.show({spinner: QSpinnerPie})
            const result = await axios({
                method: 'POST',
                url: 'api/v1/users/login',
                withCredentials: true,
                data,
            })
            Notify.create({
                message: 'Login Successful',
                icon: 'check',
                color: 'positive',
                textColor: 'white',
            })
            Cookies.set('jwt', result.data.token)
            LocalStorage.set('isLoggedIn', true)
            if(result.data.data.user.role === 'admin'){
                    LocalStorage.set('role', 1)
                    dispatch('fetchUser')
                }else{
                    LocalStorage.set('role', 0)
                    dispatch('fetchUser')
                }
                this.$router.push('/')
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                Notify.create({
                    message: e.response.data.message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }else {
                Notify.create({
                    message: 'Error!!! Something went wrong.',
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }
        }
    },
    async signup({commit, dispatch}, data) {
        try{
            Loading.show()
            const result = await axios({
                method: 'POST',
                url: 'api/v1/users/signup',
                withCredentials: true,
                data,
            })
            Notify.create({
                message: 'Successful',
                icon: 'check',
                color: 'positive',
                textColor: 'white',
            })
            Cookies.set('jwt', result.data.token)
            // Loading.hide()
            LocalStorage.set('isLoggedIn', true)
            if(result.data.data.user.role === 'admin'){
                    LocalStorage.set('role', 1)
                    dispatch('fetchUser')
                }else{
                    LocalStorage.set('role', 0)
                    dispatch('fetchUser')
                }
                this.$router.push('/')
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                Notify.create({
                    message: e.response.data.message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }else {
                Notify.create({
                    message: 'Error!!! Something went wrong.',
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }
        }
    },
    async fetchUser({commit, dispatch}) {
        try{
            Loading.show({spinner: QSpinnerPie})
            const result = await axios({
                method: 'GET',
                url: 'api/v1/users/me',
                withCredentials: true,
            })
            commit('setUser', result.data.user)
            if(result.data.user.role === 'admin'){
                LocalStorage.set('role', 1)
            }else{
                LocalStorage.set('role', 0)
            }
            Loading.hide()
        }catch(e){
            Cookies.remove('jwt')
            LocalStorage.set('isLoggedIn', false)
            LocalStorage.remove('role')
            Loading.hide()
            // this.$router.replace('/')
        }
    },
    async logout({commit, dispatch}) {
        try{
            Loading.show({spinner: QSpinnerPie})
            await axios({
                method: 'GET',
                url: 'api/v1/users/logout',
                withCredentials: true,
            })
            commit('clearUser', {user: null})
            Cookies.remove('jwt')
            LocalStorage.set('isLoggedIn', false)
            LocalStorage.remove('role')
            this.$router.push('/')
            Loading.hide()
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                Notify.create({
                    message: e.response.data.message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }else {
                Notify.create({
                    message: 'Error!!! Something went wrong.',
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
            }
        }
    },
    passwordUpdated({commit}, payload) {
        commit('setUser',payload)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}