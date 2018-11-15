<template>
    <div class="contact-info">
        <div class="name">
            <span class="icon" v-html="iconSvg" />
            {{c.first_name}}<br />{{c.last_name}}
        </div>
        <div class="data">
            <label class="info">Date of Birth</label>
            <div>{{dobFormat(c.date_of_birth)}}</div>
        </div>
        <div class="data">
            <label class="info">Addresses</label>
            <div v-for="a in c.addresses" :key="a.id">{{a.address}}</div>
        </div>
        <div class="data">
            <label class="info">Phones</label>
            <div v-for="p in c.phones" :key="p.id">{{p.phone}}</div>
        </div>
        <div class="data">
            <label class="info">Emails</label>
            <div v-for="e in c.emails" :key="e.id">{{e.email}}</div>
        </div>
    </div>
</template>

<script>
import j from 'jdenticon'
import dayjs from 'dayjs'

export default {
    methods: {
        dobFormat(d) {
            return dayjs(d).format('MMM D YYYY')
        }
    },
    computed: {
        c () {
            let currentId = this.$store.state.selectedContactId
            return this.$store.state.contacts[currentId]
        },
        iconSvg() {
            let c = this.c
            return j.toSvg(c.first_name + c.last_name + (c.id - 1), 72)
        }
    }
}
</script>



<style lang="scss" scoped>
.contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .data {
        padding: 10px 0;

        .info {
            display: inline-block;
            color: #666;
            width: 120px;
            border-bottom: 1px solid #CCC;
            margin-bottom: 4px;
        }
    }

    .name {
        .icon {
            padding-right: 20px
        }
        display: flex;
        align-items: center;

        font-size: 24px;
        font-weight: 400;
    }
}
</style>
