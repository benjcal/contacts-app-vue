<template>
    <div class="contact-info" v-if="contact">

        <!-- Name and icon -->
        <div class="name">
            <span class="icon" v-html="iconSvg" />

            <!-- display when not editing -->
            <template v-if="!isEditing">
                {{contact.first_name}}<br />{{contact.last_name}}
            </template>

            <!-- display when editing -->
            <template v-if="isEditing">
                <div class="pure-form">
                    <input v-model="contact.first_name" type="text" size="20"><br>
                    <input v-model="contact.last_name" type="text" size="20">
                </div>
            </template>
        </div>

        <!-- Date of Birth -->
        <div class="data">
            <label class="info">Date of Birth</label>

            <template v-if="!isEditing">
                <div>{{dobFormat(contact.date_of_birth)}}</div>
            </template>

            <template v-if="isEditing">
                <date-selector v-model="contact.date_of_birth"/>
            </template>
        </div>

        <!-- Addresses -->
        <div class="data">
            <label class="info">
                <!-- display plural if more than one item -->
                {{contact.addresses.length > 1 ? 'Addresses' : 'Address'}}
            </label>

            <template v-if="!isEditing">
                <div v-for="a in contact.addresses" :key="a.id">{{a.address}}</div>
            </template>

            <template v-if="isEditing">
                <div class="pure-form pure-form-stacked">
                    <div v-for="a in contact.addresses" :key="a.id">
                        <input type="text" v-model="a.address">
                    </div>
                    <button
                        class="pure-button"
                        title="Add Address"
                        @click="contact.addresses.push({address: ''})" >
                        <i class="fa fa-plus" />
                    </button>
                </div>
            </template>
        </div>

        <!-- Phones -->
        <div class="data">
            <label class="info">{{contact.phones.length > 1 ? 'Phone Number' : 'Phone Numbers'}}</label>

            <template v-if="!isEditing">
                <div v-for="p in contact.phones" :key="p.id">{{p.phone}}</div>
            </template>

            <template v-if="isEditing">
                <div class="pure-form pure-form-stacked">
                    <div v-for="p in contact.phones" :key="p.id">
                        <input type="text" v-model="p.phone">
                    </div>
                    <button
                        class="pure-button"
                        title="Add Phone"
                        @click="contact.phones.push({phone: ''})" >
                        <i class="fa fa-plus" />
                    </button>
                </div>
            </template>
        </div>

        <!-- Emails -->
        <div class="data">
            <label class="info">Emails</label>
            <template v-if="!isEditing">
                <div v-for="e in contact.emails" :key="e.id">{{e.email}}</div>
            </template>

            <template v-if="isEditing">
                <div class="pure-form pure-form-stacked">
                    <div v-for="e in contact.emails" :key="e.id">
                        <input type="text" v-model="e.email">
                    </div>
                    <button
                        class="pure-button"
                        title="Add Phone"
                        @click="contact.emails.push({email: ''})" >
                        <i class="fa fa-plus" />
                    </button>
                </div>
            </template>
        </div>

        <template v-if="!isEditing">
            <button @click="edit" class="pure-button pure-button-primary" title="Edit"><i class="fa fa-pencil"></i></button>
        </template>

        <template v-if="isEditing">
            <div class="header-right pure-button-group">
                <button
                    @click="deleteContact"
                    class="button-error pure-button"
                    title="Delete Contact">
                    <i class="fa fa-trash" />
                </button>
                <button
                    @click="discard"
                    class="button-warning pure-button"
                    title="Save">
                    <i class="fa fa-undo" />
                </button>
                <button
                    @click="save"
                    class="button-success pure-button"
                    title="Save">
                    <i class="fa fa-floppy-o" />
                </button>

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
            contactCopy: {}
        }
    },
    methods: {
        dobFormat(date) {
            return dayjs(date).format('MMM D YYYY')
        },
        edit() {
            this.contactCopy = Object.assign({}, this.contact)
            this.isEditing = true
        },
        save() {
            this.isEditing = false
        },
        discard() {
            this.isEditing = false
        },
        deleteContact() {
            alert('Are you sure?')
            this.$store.dispatch('deleteContact', this.contact.id)
            this.isEditing = false
        }
    },
    computed: {
        isEditing: {
            set() {
                let editing = this.$store.state.isEditing
                this.$store.commit('updateEditing', !editing)
            },
            get() {
                return this.$store.state.isEditing
            }
        },

        contact() {
            let s = this.$store.state
            if (this.isEditing) {
                return this.contactCopy
            }
            return s.contacts[s.selectedContactId]
        },

        iconSvg() {
            let contact = this.contact

            // 72px size
            return j.toSvg(contact.first_name + contact.last_name + contact.id, 72)
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
.button-error,
.button-warning
{
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    width: 80px;
}
.button-success {
    background: rgb(28, 184, 65); /* this is a green */
}
.button-error {
    background: rgb(202, 60, 60); /* this is a maroon */
    width: 60px;
}
.button-warning {
    background: rgb(223, 117, 20); /* this is an orange */
}
</style>
