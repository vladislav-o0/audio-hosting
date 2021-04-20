<template>
    <form @submit.prevent="upload" id="uploadForm" enctype="multipart/form-data">
        <input type="text" name="author" placeholder="Автор">
        <input type="text" name="name" placeholder="Название">
        <select name="genre">
            <option v-for="(value, key) in genres" :value="key">{{value}}</option>
        </select>
        <input type="file" name="file">
        <input type="submit" value="Отправить">
    </form>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState(['genres']),
        methods: {
            upload() {
                let form = document.getElementById('uploadForm');
                let formData = new FormData(form);
                
                this.axios.post('http://localhost:3000/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(() => {
                    this.$store.dispatch('getTracks');
                  console.log('SUCCESS!!');
                })
                .catch(function(e){
                    console.log(e)
                  console.log('FAILURE!!');
                });
            }
        }
    }
</script>

<style lang="scss">

</style>