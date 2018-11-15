import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _omit from 'lodash/omit'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contacts: {},
        selectedContactId: 0,
        isReady: false,
        isEditing: false,
        filterBy: ''
    },
    mutations: {
        updateAllContacts(state, contacts) {
            contacts = contacts.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, {})
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
        },
        updateEditing(state, editing) {
            state.isEditing = editing
        },
        removeContact(state, id) {
            console.log(state.contacts[id])
            state.contacts = _omit(state.contacts, [id])
        }
    },
    actions: {
      async fetchAllContacts(context) {
          context.commit('updateReady', false)
          let res = await axios.get('http://localhost:5000/contact')
          context.commit('updateAllContacts', res.data)
          context.commit('updateReady', true)
      },

      async deleteContact(context, id) {
          await axios.delete(`http://localhost:5000/contact/${id}`)
          context.commit('removeContact', id)
          console.log(id)
      }
    }
})
