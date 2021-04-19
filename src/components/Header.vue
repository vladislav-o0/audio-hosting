<template>
    <div class="header">
        <img class="header-logo" src="logo.svg" alt="logo">
        <template v-if="authCompleted">
            <div v-if="!isLoggedIn" class="header-wrap-buttons">
                <div class="header-buttons">
                    <router-link to="/login" class="header-btn">Войти</router-link>
                </div>
                <div class="header-buttons">
                    <router-link to="/registration" class="header-btn">Регистрация</router-link>
                </div>
            </div>
            <a v-else class="header-btn" @click="logout">Logout</a>
        </template>
        <p v-if="isLoggedIn">Вы вошли как {{user.name}}</p>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        methods: {
            logout() {
                this.$store.dispatch('logout')
                .then(() => {
                  this.$router.push('/')
                })
            }
        },
        computed: mapState(['authCompleted', 'isLoggedIn', 'user'])
    }
</script>

<style lang="scss">
    .header {
        height: 50px;
        box-shadow: 0px 0px 6px;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-between;
        padding: 5px 15px;
        &-wrap-buttons {
            display: flex;
        }
        &-buttons {
            align-self: center;
        }
        &-btn {
            margin-left: 15px;
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