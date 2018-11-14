<template>
    <div class="contact-info">
        <div class="icon">
            <svg :data-jdenticon-value="firstName + lastName" width="80" height="80" />
        </div>

        <div class="pure-form" v-if="editing">
            <legend>Full Name</legend>
            <span class="pure-group">
                <input id="f" type="text" v-model="firstName">
                <input id="l" type="text" v-model="lastName">
            </span>

            <legend>Date of Birth</legend>
                <v-date-picker
                    v-model='dateOfBirth'>
                </v-date-picker>
            
            <button class="button-success pure-button">✓</button>
            <button class="button-error pure-button" @click="editing = !editing">x</button>
            
            
            
        </div>
        <hash-icon />
        <h1 v-if="!editing">{{firstName}} {{lastName}}</h1>
        
        <button class="pure-button" @click="editing = !editing" v-if="!editing">Edit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editing: false,
            firstName: 'Albert',
            lastName: 'Einstein',
            dateOfBirth: '',
        }
    }
}
</script>



<style lang="scss" scoped>
.contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button-error {
    background: rgb(202, 60, 60);
    color: #FFF;
    font-weight: 700;
    height: 38px;
}
.button-success {
    background: rgb(28, 184, 65);
    color: #FFF;
    font-weight: 700;
    height: 38px;
}
</style>
