<template>
    <div class="contact-info">

        <!-- Name and icon -->
        <div class="name">
            <span class="icon" v-html="iconSvg" />

            <!-- display when not editing -->
            <template v-if="!isEditing">
                {{c.first_name}}<br />{{c.last_name}}
            </template>

            <!-- display when editing -->
            <template v-if="isEditing">
                <div class="pure-form">
                    <input type="text" size="20"><br>
                    <input type="text" size="20">
                </div>
            </template>
        </div>

        <!-- Date of Birth -->
        <div class="data">
            <label class="info">Date of Birth</label>

            <template v-if="!isEditing">
                <div>{{dobFormat(c.date_of_birth)}}</div>
            </template>

            <template v-if="isEditing">
                <date-selector />
            </template>
        </div>

        <!-- Addresses -->
        <div class="data">
            <label class="info">
                <!-- display plural if more than one item -->
                {{c.addresses.length > 1 ? 'Addresses' : 'Address'}}
            </label>

            <template v-if="!isEditing">
                <div v-for="a in c.addresses" :key="a.id">{{a.address}}</div>
            </template>

            <template v-if="isEditing">
                <div class="pure-form pure-form-stacked">
                    <input type="text">
                    <input type="text">
                    <input type="text">
                    <button class="pure-button" title="Sync"><i class="fa fa-plus"></i></button>
                </div>
            </template>
        </div>

        <!-- Phones -->
        <div class="data">
            <label class="info">{{c.phones.length > 1 ? 'Phone Number' : 'Phone Numbers'}}</label>

            <template v-if="!isEditing">
                <div v-for="p in c.phones" :key="p.id">{{p.phone}}</div>
            </template>

            <template v-if="isEditing">
                <div class="pure-form pure-form-stacked">
                    <input type="text">
                    <input type="text">
                    <button class="pure-button" title="Sync"><i class="fa fa-plus"></i></button>
                </div>
            </template>
        </div>

        <!-- Emails -->
        <div class="data">
            <label class="info">Emails</label>
            <template v-if="!isEditing">
                <div v-for="e in c.emails" :key="e.id">{{e.email}}</div>
            </template>
            <template v-if="isEditing">
                <div class="pure-form pure-form-stacked">
                    <input type="text">
                    <input type="text">
                    <button class="pure-button" title="Sync"><i class="fa fa-plus"></i></button>
                </div>
            </template>
        </div>

        <template v-if="!isEditing">
            <button @click="edit" class="pure-button pure-button-primary" title="Edit"><i class="fa fa-pencil"></i></button>
        </template>

        <template v-if="isEditing">
            <div class="header-right pure-button-group">
                <button @click="discard" class="button-error pure-button" title="Sync"><i class="fa fa-undo"></i></button>
                <button @click="save" class="button-success pure-button" title="Save"><i class="fa fa-floppy-o"></i></button>
            </div>
        </template>

    </div>
</template>

<script>
import j from 'jdenticon'
import dayjs from 'dayjs'
import DateSelector from '@/components/DateSelector.vue'

export default {
    components: {
        DateSelector
    },
    data() {
        return {
            isEditing: false
        }
    },
    methods: {
        dobFormat(d) {
            return dayjs(d).format('MMM D YYYY')
        },
        edit () {
            this.isEditing = true
        },
        save () {
            this.isEditing = false
        },
        discard () {
            this.isEditing = false
        }
    },
    computed: {
        c () {
            let s = this.$store.state
            return s.contacts.filter(e => e.id === s.selectedContactId)[0]
        },
        iconSvg() {
            let c = this.c

            // 72px size
            return j.toSvg(c.first_name + c.last_name + c.id, 72)
        }
    }
}
</script>


<style lang="scss" scoped>
.contact-info {
    padding: 0 40px;

    .name {
        .icon {
            padding-right: 20px
        }

        display: flex;
        align-items: center;

        font-size: 24px;
    }

    .data {
        padding: 10px 0;

        .info {
            display: inline-block;
            color: #666;
            width: 160px;
            border-bottom: 1px solid #CCC;
            margin-bottom: 4px;
        }
    }
}

// https://purecss.io/buttons/
.button-success,
.button-error
{
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.button-success {
    background: rgb(28, 184, 65); /* this is a green */
}
.button-error {
    background: rgb(202, 60, 60); /* this is a maroon */
}
</style>
