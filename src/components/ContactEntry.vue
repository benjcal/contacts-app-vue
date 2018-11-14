<template>

<div class="contact-entry">
    <span class="icon">
        <svg data-jdenticon-value="user127" width="46" height="46" />
    </span>
    <span class="first_name">First&nbsp;</span>
    <span class="last_name">Last</span>
</div>

</template>

<script>
import 'jdenticon'
export default {
    
}
</script>

<style lang="scss" scoped>
.contact-entry {
    display: flex;
    align-items: center;

    padding: 10px 0;

    .icon {
        padding-right: 10px;
    }
}
</style>

