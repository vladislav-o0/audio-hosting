<template>
  <router-view></router-view>
</template>

<script>
  export default {
    beforeCreate() {

      const token = localStorage.getItem('token');
      if (token) {
        this.axios.defaults.headers.common['Authorization'] = token;

        this.axios({url: 'http://localhost:3000/auth', method: 'GET'})
        .then(res => {
          this.$store.commit('auth_success', {user: res.data.user});
        }).finally(() => {
          this.$store.commit('setAuthComp');
        });
      } else {
        this.$store.commit('setAuthComp');
      }

      this.$store.dispatch('getTracks');
    }
  }
</script>

<style lang="scss">
  body {
    background: linear-gradient(90deg, #1ae7be, #09b2bf);
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
  }
  .wrapper {
    max-width: 900px;
    margin: 0 auto;
  }
  .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(255,255,255,.6);
        width: 400px;
        padding: 100px 0px;
        border-radius: 5px;
        border: 2px solid rgba(255, 255, 255, 0.6);
        position: relative;
        box-shadow: 0px 0px 8px;
        &-wrap {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &-input {
            height: 30px;
            border-radius: 5px;
            border: none;
            margin: 8px;
            text-align: center;
            box-shadow: 0px 0px 6px;
        }
        &-btn { 
            padding: 0 40px;
            height: 50px;
            background-color: #051d36;
            border: none;
            color: wheat;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 17px;
            outline: none;
            &-back {
              text-decoration: none;
              font-size: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              top: 15px;
              margin: 0;
              opacity: 0.7;
              left: 15px;
              height: 30px;
              padding: 0px 10px;
              &:hover {
                opacity: 1;
              }
            }
        }
        &-header {
            margin-top: 0;
            font-size: 44px;
            color: #051d36;
        }
    }
</style>
