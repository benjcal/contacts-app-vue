<template>
    <div id="app" v-if="isReady">
        <app-header />
        <main>
            <div class="left">
            <div class="span">
                <filter-bar />
            </div>
            
            <contact-list />
        </div>
        
        <div class="right">
            <contact-info />
        </div>
        </main>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import FilterBar from '@/components/FilterBar.vue'
import ContactList from '@/components/ContactList.vue'
import ContactInfo from '@/components/ContactInfo.vue'

export default {
    name: 'app',
    
    components: {
        AppHeader,
        FilterBar,
        ContactList,
        ContactInfo
    },
    computed: {
        isReady() {
            return this.$store.state.isReady
        }
    },
    created() {
        this.$store.dispatch('fetchAllContacts')
    }
}
</script>


<style lang="scss">
html, body, #app {
    padding: 0;
    margin: 0;
    height: 100%;
}
#app {
    font-family: 'Montserrat', sans-serif;
    max-width: 1000px;

    main {
        display: flex;
        height: calc(100% - 50px); // -50 for the header height
    }
    
    .left {
        flex: 0 1 300px;
    }

    .right {
        flex: 1 1 auto;
        background: #EEE;
    }
}

</style>
