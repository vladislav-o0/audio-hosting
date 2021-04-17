<template>
    <div class="reg-wrapper">
        <router-link class="reg-back" to="/">Назад</router-link>
        <form class="reg-form" @submit.prevent="register">
            <label for="name">Имя</label>
            <div>
                <input class="reg-input" id="name" type="text" v-model="name" required autofocus>
            </div>
            <label for="email" >E-Mail Address</label>
            <div>
                <input class="reg-input" id="email" type="email" v-model="email" required>
            </div>    
            <label for="password">Пароль</label>
            <div>
                <input class="reg-input" id="password" type="password" v-model="password" required>
            </div>   
            <label for="password-confirm">Повторите пароль</label>
            <div>
                <input class="reg-input" id="password-confirm" type="password" v-model="password_confirmation" required>
            </div>
            <div>
                <button type="submit">Зарегистрироваться</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                name : "",
                email : "",
                password : "",
                password_confirmation : "",
                is_admin : null
            }
        },
        methods: {
            register: function () {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    is_admin: this.is_admin
                }
                this.$store.dispatch('register', data)
               .then(() => this.$router.push('/'))
               .catch(err => console.log(err))
            }
        }
    }
</script>

<style lang="scss">
    .reg {
        &-back {
            text-decoration: none;
            position: absolute;
            top: 50px;
            font-size: 20px;
            left: 50px;
        }
        &-wrapper {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &-input {
            border-radius: 5px;
            border: 2px solid;
        }
    }
</style>