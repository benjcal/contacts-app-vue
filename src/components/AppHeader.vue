<template>
    <div class="app-header">
        <div class="header-left">
            <i class="fa fa-address-book" />
            <span class="app-name">Contacts App</span>
        </div>

        <!-- Add new contact button -->
        <div class="header-right pure-button-group">
            <button
                class="pure-button pure-button-primary"
                title="Add Contact"
                @click="addNewContact">
                    <i class="fa fa-user-plus" />
            </button>

            <!-- IDEA: add offline functionality by sending to the server a queqe of ACTIONS -->
            <!-- <button
                class="pure-button pure-button-primary"
                title="Sync">
                <i class="fa fa-refresh" />
            </button> -->
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        addNewContact() {
            this.$store.dispatch('newEmptyContact')
        }
    }
}
</script>


<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;

    background: #DDD;
    color: #444;

    height: 50px;

    .header-left {
        flex: 1 1 auto;

        i {
            padding: 0 10px;

            font-size: 24px;
            color: #0078e7;
        }

        .app-name {
            font-weight: 500;
        }
    }

    .header-right {
        display: flex;

        padding-right: 10px;

        button {
            width: 60px
        }
    }
}
</style>
