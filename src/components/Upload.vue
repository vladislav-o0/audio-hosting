<template>
    <form class="uploadForm" @submit.prevent="upload" id="uploadForm" enctype="multipart/form-data">
        <input type="text" name="author" placeholder="Автор">
        <input type="text" name="name" placeholder="Название">
        <select name="genre">
            <option v-for="(value, key) in genres" :value="key">{{value}}</option>
        </select>
        <input @change="selectedFile" id="uploadFile" hidden type="file" name="file">
        <label class="uploadFile" for="uploadFile">{{fileName}}</label>
        <input type="submit" value="Отправить">
    </form>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                fileName: 'Выберите аудио'
            }
        },
        computed: mapState(['genres']),
        methods: {
            selectedFile(e) {
                let files = e.target.files;

                if (!files.length) return this.fileName = 'Выберите аудио';
                this.fileName = files[0].name;
            },
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

<style lang="scss" scoped>
    .uploadForm {
        display: flex;
        flex-flow: column;
        max-width: 350px;
    }
    input, select, .uploadFile {
    border-radius: 5px;
    height: 30px;
    border: 2px solid #85919c;
    }
    .uploadFile {
        background-color: white;
    }
</style>