<template>
<div class="pure-form">
    <select v-model="month" @change="changed">
        <option value="" disabled selected>Month</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
    </select>

    <!-- ain't nobody got this fot this... -->
    <select v-model="day" @change="changed">
        <option value="" disabled selected>Day</option>
        <option v-for="d in days" :key="d" :value="d">{{d}}</option>
    </select>

    <!-- nor this -->
    <select v-model="year" @change="changed">
        <option value="" disabled selected>Year</option>
        <option v-for="y in years" :key="y" :value="y">{{y}}</option>
    </select>
</div>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            month: '',
            day: '',
            year: ''
        }
    },
    computed: {
        // gen numbers from 1-31
        days() {
            let n = []
            for (let i = 1; i <= 31; i++) {
                n.push(i)
            }
            return n
        },

        // generate numbers from 1900 to whatever year it is
        years() {
            let d = new Date()
            let n = []

            for (let i = 1900; i <= d.getFullYear(); i++) {
                n.push(i)
            }
            n.reverse()
            return n
        }
    },

    methods: {
        // prepare date for API query
        changed() {
            let day = this.day < 10 ? `0${this.day}` : `${this.day}`
            let month = this.month < 10 ? `0${this.month}` : `${this.month}`
            this.$emit('input', `${this.year}-${month}-${day}`)
        }

    }
}
</script>
