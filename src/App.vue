<template>
    <div id="app">
        <div class="left">
            <div class="span">
                <filter-bar />
            </div>
            
            <contact-list />
        </div>
        
        <div class="right">
            <contact-info />
        </div>
    </div>
</template>

<script>
import FilterBar from '@/components/FilterBar.vue'
import ContactList from '@/components/ContactList.vue'
import ContactInfo from '@/components/ContactInfo.vue'

export default {
    name: 'app',
    
    components: {
        FilterBar,
        ContactList,
        ContactInfo
    }
}
</script>


<style lang="scss">
#app {
    display: flex;

    .left {
        flex: 0 0 400px;
    }

    .right {
        flex: 0 0 400px;
    }
}

</style>
