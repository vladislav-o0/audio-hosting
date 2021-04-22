<template>
    <div class="form-wrap">
        <form class="form" @submit.prevent="register">
            <router-link class="form-btn form-btn-back" to="/">Назад</router-link>
            <h1 class="form-header">Регистрация</h1>
            <input class="form-input" id="name" type="text" v-model="name" placeholder="Имя" required autofocus>
    
            <input class="form-input" id="email" type="email" v-model="email" placeholder="Email" required>       
        
            <input class="form-input" id="password" type="password" v-model="password" placeholder="Пароль" required>
        
            <input class="form-input" id="password-confirm" type="password" v-model="password_confirmation" placeholder="Повторите пароль" required>
            <button class="form-btn" type="submit">Зарегистрироваться</button>
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
