<template>
    <div class="contact-list">
        <contact-entry
            v-for="contact in contacts"
            :key="contact.id"
            :contact="contact"
            v-if="filter(contact)" />
    </div>
</template>

<script>
import ContactEntry from '@/components/ContactEntry.vue'

export default {
    components: {
        ContactEntry
    },

    methods: {
        filter(contact) {
            let param = this.$store.state.filterBy.toLowerCase()
            return ( contact.first_name.toLowerCase().includes(param)
                    || contact.last_name.toLowerCase().includes(param) )
        }
    },

    computed: {
        contacts() {
            let contacts = Object.values(this.$store.state.contacts)

            // sort contacts by first_name
            contacts.sort((a, b) => {
                if (a.first_name < b.first_name) {
                    return -1
                }
                else if (a.first_name > b.first_name) {
                    return 1
                    }
                return 0
            })

            return contacts
        }
    }
}
</script>

<style lang="scss" scoped>
.contact-list {
    height: calc(100% - 32px); // -32px for the heigh of the search
    overflow-y: auto;
}
</style>
