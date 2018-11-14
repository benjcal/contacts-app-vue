<template>
    <div class="contact-info">
        <div class="icon">
            <svg :data-jdenticon-value="firstName + lastName" width="80" height="80" />
        </div>

        <span class="pure-form" v-if="editing">
            <input type="text" v-model="firstName" size="10">
            <input type="text" v-model="lastName" size="10">
            <button class="button-success pure-button">✓</button>
            <button class="button-error pure-button">x</button>
        </span>
        <hash-icon />
        <h1 v-if="!editing" @click="editing = !editing">{{firstName}} {{lastName}}</h1>

    </div>
</template>

<script>
export default {
    data() {
        return {
            editing: false,
            firstName: 'Full',
            lastName: 'Name'
        }
    }
}
</script>



<style lang="scss" scoped>
.contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    span.pure-form {
        display: flex;
    }
}

.button-error {
            background: rgb(202, 60, 60);
            color: #FFF;
            font-weight: 700;
        }
        .button-success {
            background: rgb(28, 184, 65);
            color: #FFF;
            font-weight: 700;
        }


</style>
