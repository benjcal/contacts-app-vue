<template>
    <div class="filter-bar pure-form">
        <input
            type="text"
            placeholder="Search..."
            size="36"
            v-model="filter"
            :disabled="isEditing"
        />
    </div>
</template>

<script>
export default {
    computed: {
        filter: {
            set(val) {
                this.$store.commit('_updateFilter', val)
            },
            get() {
                return this.$store.state.filterBy
            }
        },

        isEditing() {
            return this.$store.state.isEditing
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
