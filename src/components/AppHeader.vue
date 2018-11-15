<template>
    <div class="app-header">
        <div class="header-left">
            <i class="fa fa-address-book"></i>
            <span class="app-name">Contacts App</span>
        </div>
        <div class="header-right pure-button-group">
            <button
                class="pure-button pure-button-primary"
                title="Add Contact">
                    <i class="fa fa-user-plus" />
            </button>
            <button
                class="pure-button pure-button-primary"
                title="Sync">
                <i class="fa fa-refresh" />
            </button>
        </div>
    </div>
</template>

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

