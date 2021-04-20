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
  }
</style>
