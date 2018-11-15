<template>
    <div class="contact-list">
        <contact-entry v-for="c in contacts" :key="c.id" :contact="c"/>
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
            return this.$store.state.contacts
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

