<template>
    <div class="contact-list">
        <contact-entry
            v-for="contact in contacts"
            :key="contact.id"
            :contact="contact"
            v-show="contact.first_name.toLowerCase().includes(filterBy)
                    || contact.last_name.toLowerCase().includes(filterBy)"
        />
    </div>
</template>

<script>
import ContactEntry from '@/components/ContactEntry.vue'

export default {
    components: {
        ContactEntry
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
        },

        filterBy() {
            return this.$store.state.filterBy.toLowerCase()
        }
    }
}
</script>

<style lang="scss" scoped>
.contact-list {
    height: calc(100% - 32px); // -32px for the heigh of the search
    overflow-y: scroll;
}
</style>

