<template>
    <div class="filter-bar pure-form">
        <input type="text" placeholder="Search..." size="36" v-model="filter">
    </div>
</template>

<script>
export default {
    computed: {
        filter: {
            set(e) {
                this.$store.commit('updateFilter', e)
            },
            get() {
                return this.$store.state.filterBy
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.filter-bar {
    display: flex;
    justify-content: space-between;

    input {
        height: 32px;
    }
}
</style>
