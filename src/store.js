import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _omit from 'lodash/omit'

Vue.use(Vuex)

const API_URL = 'http://benjlabs.io/contact'

export default new Vuex.Store({
    state: {
        contacts: {},
        currentContact: undefined,
        isReady: false,
        isEditing: false,
        filterBy: ''
    },
    mutations: {
        _updateAllContacts(state, contacts) {
            contacts = contacts.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, {})
            state.contacts = contacts
        },
        _updateSelection(state, id) {
            state.currentContact = Object.assign({}, state.contacts[id])
        },
        _clearSelection(state) {
            state.currentContact = undefined
        },
        _updateReady(state, ready) {
            state.isReady = ready
        },
        _updateFilter(state, filter) {
            state.filterBy = filter
        },
        _updateEditing(state, editing) {
            state.isEditing = editing
        },
        _deleteContact(state, id) {
            state.contacts = _omit(state.contacts, [id])
        },
        _updateContact(state, contact) {
            state.contacts[contact.id] = contact
        },
        _addEmptyContact(state) {
            state.contacts = Object.assign({}, state.contacts, {_new: {
                id: '_new',
                first_name: '',
                last_name: '',
                date_of_birth: '0001-01-01',
                addresses: [],
                emails: [{email: ''}],
                phones: [{phone: ''}]
            }})
        },
        _addContact(state, contact) {
            // create and empty object and assign the correct key
            let obj = {}
            obj[contact.id] = contact

            state.contacts = Object.assign({}, state.contacts, obj)
        }
    },

    actions: {
        async fetchAllContacts(context) {
            context.commit('_updateReady', false)
            let res = await axios.get(API_URL)
            context.commit('_updateAllContacts', res.data)
            context.commit('_updateReady', true)
        },

        async deleteContact(context, id) {
            if (id === '_new') {
                context.commit('_deleteContact', id)
                context.commit('_clearSelection')
                context.commit('_updateEditing', false)
            } else {
                await axios.delete(`${API_URL}/${id}`)
                context.commit('_deleteContact', id)
                context.commit('_clearSelection')
                context.commit('_updateEditing', false)
            }
        },

        async updateContact(context) {
            let contact = context.state.currentContact
            let res = await axios.put(`${API_URL}/${contact.id}`, contact)
            context.commit('_updateContact', res.data)
            context.commit('_updateEditing', false)
        },

        async addContact(context) {
            let contact = context.state.currentContact
            let res = await axios.post(API_URL, contact)
            context.commit('_addContact', res.data)
            context.commit('_deleteContact', '_new')
            context.commit('_updateSelection', res.data.id)
            context.commit('_updateEditing', false)
        },

        newEmptyContact(context) {
            context.commit('_addEmptyContact')
            context.commit('_updateSelection', '_new')
            context.commit('_updateEditing', true)
        }
    }
})
