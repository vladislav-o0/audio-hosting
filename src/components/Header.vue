<template>
    <div class="header">
        <img class="header-logo" src="logo.svg" alt="logo">
        <div class="header-buttons">
            <a href="#" class="header-btn">Вход</a>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    .header {
        height: 50px;
        box-shadow: 0px 0px 6px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 5px 15px;
        &-buttons {
            align-self: center;
        }
        &-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            width: 100px;
            height: 35px;
            border: 2px solid;
            color: white;
            transition: 0.1s;
        }
        &-btn:hover {
            color: #051e36;
        }
        &-logo {
            height: 100%;
            object-fit: contain;
            color: white;
        }
    }
</style>