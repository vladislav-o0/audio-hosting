<template>
    <div class="form-wrap">
      <form class="form" @submit.prevent="login">
        <router-link class="form-btn form-btn-back" to="/">Назад</router-link>
        <h1 class="form-header">Вход</h1>
        <input class="form-input" required v-model="email" type="email" placeholder="Email">
        <input class="form-input" required v-model="password" type="password" placeholder="Пароль">
        <button class="form-btn" type="submit">Войти</button>
      </form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                email : "",
                password : ""
            }
        },
        methods: {
            login() {
                const email = this.email 
                const password = this.password
                
                this.$store.dispatch('login', { email, password })
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err))
            }
        }  
    }
</script>
