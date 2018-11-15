<template>
    <div class="contact-entry" :class="{ selected: isSelected }" @click="select">
        <span class="icon" v-html="iconSvg" />
        <span class="first_name">{{contact.first_name}}&nbsp;</span>
        <span class="last_name">{{contact.last_name}}</span>
    </div>
</template>

<script>
import j from 'jdenticon'

export default {
    props: ['contact'],

    methods: {
        select() {
            this.$store.commit('updateSelection', this.contact.id)
        }
    },

    computed: {
        iconSvg() {
            let c = this.contact
            return j.toSvg(c.first_name + c.last_name + c.id, 46)
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

