<template>
<div class="pure-form">
    <select>
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
    <select>
        <option v-for="d in days" :key="d" :value="d">{{d}}</option>
    </select>
    <select>
        <option v-for="y in years" :key="y" :value="y">{{y}}</option>
    </select>
</div>
</template>

<script>
export default {
    computed: {
        days() {
            let n = []
            for (let i = 1; i <= 31; i++) {
                n.push(i)
            }
            return n
        },
        years() {
            let n = []
            for (let i = 1900; i <= 2018; i++) {
                n.push(i)
            }
            n.reverse()
            return n
        }
    }
}
</script>
