import axios from 'axios'
import {Loading, Notify, Cookies, LocalStorage, QSpinnerPie} from 'quasar'

const state = {
    elections: null,
    election: null,
    editDialog: false,
    editableElelction: null,
    search: '',
    electionUrl: '',
}

const getters = {
    getElections(state){
        let filteredSearch = state.elections
        if(state.search){
            filteredSearch = []
            state.elections.forEach(election => {
                if(election.name.toLowerCase().includes(state.search.toLowerCase())){
                    filteredSearch.push(election)
                }
            })
        }
        return filteredSearch
    },
    election(state){
        return state.election
    },
    editableElelction(state){
        return state.editableElelction
    }
}

const mutations = {
    setElections(state, payload){
        state.elections = payload
    },
    findElection(state, payload){
        state.election = state.elections.find(e => e.id === payload)
        if(state.election){
            this.$router.push(`/vote/${state.election.slug}`)
        }else {
            this.$router.push(`/*`)
        }
    },
    loadElection(state,payload){
        state.electionUrl = payload
        if(payload != null){
            if(state.elections){
                const election = state.elections.find(e => e.slug === payload)
                if(!election){
                    this.$router.push(`/*`)
                }else {
                    state.election = election
                }
            }
        }
        // else{
        //     this.$router.push(`/*`)
        // }
    },
    setElection(state, payload){
        state.election = state.elections.find(e => e.id === payload)

    },
    editDialog(state, payload){
        state.editDialog = payload
    },
    editableElelction(state, payload){
        state.editableElelction = payload
    },
    setSearch(state, payload){
        state.search = payload
    }
}

const actions = {
    async getDb({commit}){
        const res = await axios({
            method: 'GET',
            url: 'api/v1/tests/',
            withCredentials: true
        })
        commit('setElections', res.data.data)
    },
    async getAllElections({commit}){
        try {
            const res = await axios({
                method: 'GET',
                url: 'api/v1/elections',
                withCredentials: true
            })
            commit('setElections', res.data.data)
        }catch(e){
            if(e.response.data.message){
                this.$q.notify({
                  message: e.response.data.message,
                  icon: 'warning',
                  color: 'negative',
                  textColor: 'white',
              })
              }else {
                this.$q.notify({
                  message: 'Something went wrong',
                  icon: 'warning',
                  color: 'negative',
                  textColor: 'white',
                })
              }
        }
    },
    gotoElection({commit}, payload){
        const role = LocalStorage.getItem('role')
        if(role === 0 || role === null){
            commit('findElection', payload.id)
        }else {
            commit('editDialog', true)
            commit('editableElelction', payload)
        }
    },
    closeDialog({commit}, payload){
        commit('editDialog', payload)
    },
    onLoadElection({commit, dispatch}, payload){
        dispatch('getAllElections').then(() => {
            commit('loadElection', payload)
        }).catch(e => {
            if(e.response.data.message){
                this.$q.notify({
                  message: e.response.data.message,
                  icon: 'warning',
                  color: 'negative',
                  textColor: 'white',
              })
              }else {
                this.$q.notify({
                  message: 'Something went wrong',
                  icon: 'warning',
                  color: 'negative',
                  textColor: 'white',
                })
              }
        })
    },
    updatedVote({commit}, data){
        commit('setElections', data)
    },
    userVote({commit, state}, payload){
        commit('setElections', payload.elections)
        commit('setElection', payload.electionId)
    },
    async createElection({dispatch}, payload){
       try{
        Loading.show({spinner: QSpinnerPie})
        const res = await axios({
            method: 'POST',
            url: 'api/v1/elections',
            withCredentials: true,
            data: {
                name: payload.electionName,
                startTime: payload.startTime,
                endTime: payload.endTime
            }
        })
        for(const e of payload.candidates){
            let can = {
                label: e.label,
                agenda: e.agenda,
                election: res.data.data.id,
                value: e.label
            }
            await axios({
                method: 'POST',
                url: 'api/v1/candidates',
                withCredentials: true,
                data: can
            })
        }
        dispatch('getAllElections')
        Loading.hide()
        Notify.create({
            message: 'created Successfully.',
            icon: 'chack',
            color: 'positive',
            textColor: 'white',
        })
    }catch(e){
        Loading.hide()
        if(e.response.data.message){
            this.$q.notify({
              message: e.response.data.message,
              icon: 'warning',
              color: 'negative',
              textColor: 'white',
          })
          }else {
            this.$q.notify({
              message: 'Something went wrong',
              icon: 'warning',
              color: 'negative',
              textColor: 'white',
            })
          }
    }

    },
    async editElection({dispatch}, payload){
        try{
            Loading.show({spinner: QSpinnerPie})
            const res = await axios({
                method: 'PATCH',
                url: 'api/v1/elections/' + payload.id,
                withCredentials: true,
                data: {
                    name: payload.name,
                    startTime: payload.startTime,
                    endTime: payload.endTime
                }
            })
            for(const e of payload.candidates){
                if(e.id){
                    const id = e.id
                    delete e.id
                    delete e.__v
                    delete e._id
                    await axios({
                        method: 'PATCH',
                        url: `api/v1/candidates/${id}`,
                        withCredentials: true,
                        data: e
                    })
                }else {
                    let can = {
                        label: e.label,
                        agenda: e.agenda,
                        election: payload.id,
                        value: e.label
                    }
                    await axios({
                        method: 'POST',
                        url: 'api/v1/candidates',
                        withCredentials: true,
                        data: can
                    })
                }
            }
            dispatch('getAllElections')
            Loading.hide()
            Notify.create({
                message: 'Updated Successfully.',
                icon: 'chack',
                color: 'positive',
                textColor: 'white',
            })
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                this.$q.notify({
                  message: e.response.data.message,
                  icon: 'warning',
                  color: 'negative',
                  textColor: 'white',
              })
              }else {
                this.$q.notify({
                  message: 'Something went wrong',
                  icon: 'warning',
                  color: 'negative',
                  textColor: 'white',
                })
              }
        }
    },
    async deleteCandidate({dispatch}, id){
        try{
            Loading.show({spinner: QSpinnerPie})
            await axios({
                method: 'DELETE',
                url: 'api/v1/candidates/' + id,
                withCredentials: true,
            })
            dispatch('getAllElections')
            Loading.hide()
        }catch(e){
            Loading.hide()
            if(e.response.data.message){
                this.$q.notify({
                  message: e.response.data.message,
                  icon: 'warning',
                  color: 'negative',
                  textColor: 'white',
              })
              }else {
                this.$q.notify({
                  message: 'Something went wrong',
                  icon: 'warning',
                  color: 'negative',
                  textColor: 'white',
                })
              }
        }
    },
    changeSearch({commit}, payload){
        commit('setSearch', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}