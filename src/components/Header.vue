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
            <div v-else class="header-wrap-buttons">
                <p class="header-who-you">Вы вошли как <span class="header-nickname">{{user.name}}</span></p>
                <a class="header-btn" @click="logout">Выйти</a>
                <router-link :to="$route.path != '/'?'/':'/profile'" class="header-btn">{{$route.path != '/'?'На главную':'Профиль'}}</router-link>
            </div>
        </template>
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
        &-nickname {
            font-weight: 799;
            padding-right: 10px;
            @media (max-width: 670px) {
                padding: 0;
            }
        }
        &-who-you {
            @media (max-width: 670px) {
                width: 100%;
                text-align: right;
                margin: 0 0 10px;
            }
            @media (max-width: 430px) {
                text-align: center;
            }
        }
        height: 50px;
        box-shadow: 0px 0px 6px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        padding: 5px 15px;
        @media (max-width: 670px) {
            height: 78px;
        }
        @media (max-width: 430px) {
            flex-flow: column wrap;
            height: 146px;
            padding: 10px 0;
        }
        &-wrap-buttons {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-end;
            align-items: center;
            @media (max-width: 430px) {
                width: 100%;
                justify-content: space-evenly;
            }
        }
        &-buttons {
            align-self: center;
        }
        &-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 15px;
            text-decoration: none;
            width: 125px;
            height: 40px;
            background-color: #051d36;
            border: none;
            color: wheat;
            border-radius: 5px;
            cursor: pointer;
            outline: none;
            @media (max-width: 430px) {
                margin: 0;
            }
        }
        &-logo {
            height: 100%;
            object-fit: contain;
            color: white;
            @media (max-width: 670px) {
                height: 90%;
            }
            @media (max-width: 430px) {
                height: 70px;
            }
        }
    }
</style>