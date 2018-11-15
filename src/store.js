import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contacts: [],
        selectedContactId: 1,
        isReady: false,
        filterBy: ''
    },
    mutations: {
        updateContacts(state, contacts) {
            state.contacts = contacts
        },
        updateSelection(state, id) {
            state.selectedContactId = id
        },
        updateReady(state, ready) {
            state.isReady = ready
        },
        updateFilter(state, filter) {
            state.filterBy = filter
        }
    },
    actions: {
      async fetchAllContacts(context) {
          context.commit('updateReady', false)
          let res = await axios.get('http://localhost:5000/contact')
          context.commit('updateContacts', res.data)
          context.commit('updateReady', true)
      }
    }
})
