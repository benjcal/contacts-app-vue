<template>
    <div
        class="contact-entry"
        :class="{ selected: isSelected }"
        @click="select" >

        <!-- Icon, v-html used with care -->
        <span class="icon" v-html="iconSvg" />

        <span class="first_name">{{contact.first_name}}&nbsp;</span>
        <span class="last_name">{{contact.last_name}}</span>
    </div>
</template>

<script>
import jdenticon from 'jdenticon'

export default {
    props: ['contact'],

    methods: {
        select() {
            this.$store.commit('_updateSelection', this.contact.id)
        }
    },

    computed: {
        iconSvg() {
            let contact = this.contact
            return jdenticon.toSvg(contact.first_name
                                    + contact.last_name
                                    + contact.id, 46)
        },

        isSelected() {
            return this.$store.state.selectedContactId === this.contact.id
        }
    }
}
</script>

<style lang="scss" scoped>
.contact-entry {
    display: flex;
    align-items: center;

    padding: 10px 0;

    transition: all ease 0.3s;

    cursor: pointer;
    user-select: none;

    &:hover {
        background: #DDD;
    }

    &.selected {
        background: #DDD;
    }

    .icon {
        padding-right: 10px;
    }
}
</style>
