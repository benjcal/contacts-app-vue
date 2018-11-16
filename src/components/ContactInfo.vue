<template>
    <div class="contact-info"
        v-if="contact"
        @keypress.enter="save"
        @keypress.esc="discard" >

        <!-- Name and icon -->
        <div class="name">
            <!-- v-html used with care -->
            <span class="icon" v-html="iconSvg" />

            <!-- display when not editing -->
            <template v-if="!isEditing">
                {{contact.first_name}}<br />{{contact.last_name}}
            </template>

            <!-- display when editing -->
            <template v-if="isEditing">
                <div class="pure-form">
                    <input
                        v-model="contact.first_name"
                        type="text"
                        size="20"
                        placeholder="First Name"><br>
                    <input
                        v-model="contact.last_name"
                        type="text"
                        size="20"
                        placeholder="Last Name">
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

        <!-- Emails -->
        <div class="data">
            <label class="info">
                <!-- display plural if more than one item -->
                {{contact.emails.length > 1 ? 'Emails' : 'Email'}}
            </label>
            <template v-if="!isEditing">
                <div v-for="e in contact.emails" :key="e.id">{{e.email}}</div>
            </template>

            <template v-if="isEditing">
                <div class="pure-form pure-form-stacked">
                    <div v-for="e in contact.emails" :key="e.id">
                        <input type="text" v-model="e.email" placeholder="Email">
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

        <!-- Phones -->
        <div class="data">
            <!-- display plural if more than one item -->
            <label class="info">
                {{contact.phones.length > 1 ? 'Phone Number' : 'Phone Numbers'}}
            </label>

            <template v-if="!isEditing">
                <div v-for="p in contact.phones" :key="p.id">{{p.phone}}</div>
            </template>

            <template v-if="isEditing">
                <div class="pure-form pure-form-stacked">
                    <div v-for="p in contact.phones" :key="p.id">
                        <input type="text" v-model="p.phone" placeholder="Phone Number">
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
                        <input type="text" v-model="a.address" placeholder="Address">
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

        <!-- Buttons -->
        <template v-if="!isEditing">
            <button
                @click="edit"
                class="pure-button pure-button-primary"
                title="Edit">
                <i class="fa fa-pencil" />
            </button>
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

    methods: {
        dobFormat(date) {
            return dayjs(date).format('MMM D YYYY')
        },

        edit() {
            this.$store.commit('_updateEditing', true)
        },

        validate() {
            if (this.contact.first_name == '') {
                alert('First Name is required')
                return false
            }
            if (this.contact.last_name == '') {
                alert('Last Name is required')
                return false
            }
            if (this.contact.date_of_birth == '0001-01-01') {
                alert('Date of birth is required')
                return false
            }
            if (this.contact.emails[0].email == '') {
                alert('At least one email is required')
                return false
            }
            if (this.contact.phones[0].phone == '') {
                alert('At least one phone number is required')
                return false
            }
            return true
        },

        save() {
            let valid = this.validate(this.contact)

            if (valid) {
                if (this.contact.id === '_new') {
                    this.$store.dispatch('addContact')
                } else {
                    this.$store.dispatch('updateContact')
                }
            }
        },

        discard() {
            if (this.contact.id === '_new') {
                this.$store.dispatch('deleteContact', this.contact.id)
            }
            this.$store.commit('_updateEditing', false)
        },

        deleteContact() {
            alert('Are you sure?')

        }
    },

    computed: {
        isEditing: {
            set() {
                let editing = this.$store.state.isEditing
                this.$store.commit('_updateEditing', !editing)
            },
            get() {
                return this.$store.state.isEditing
            }
        },

        contact() {
            return this.$store.state.currentContact
        },

        iconSvg() {
            let contact = this.contact

            // 72px size icon
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
            font-size: 11px;
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
