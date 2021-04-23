<template>
    <form class="uploadForm form" @submit.prevent="upload" id="uploadForm" enctype="multipart/form-data">
        <h3 class="form-header">Добавить трек</h3>
        <input type="text" class="form-input author" name="author" placeholder="Автор">
        <input type="text" class="form-input name"  name="name" placeholder="Название">
        <select name="genre" class="form-input genres">
            <option v-for="(value, key) in genres" :disabled="key == 'default'" :selected="key == 'default'" :value="key">{{value}}</option>
        </select>
        <input @change="selectedFile" class="form-input file" id="uploadFile" hidden type="file" name="file">
        <label class="uploadFile form-input"  for="uploadFile">{{fileName}}</label>
        <input type="submit" class="form-btn" value="Добавить">
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

                let checkFormSuccess = this.checkForm();

                if (!checkFormSuccess) return;
                
                this.axios.post('http://localhost:3000/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(() => {
                    this.$store.dispatch('getTracks');
                  console.log('SUCCESS!!');
                })
                .catch(function(e){
                    console.log(e)
                  console.log('FAILURE!!');
                });
            },
            checkForm() {
                let author = document.querySelector('.author');
                let name = document.querySelector('.name');
                let genres = document.querySelector('.genres');
                let file = document.querySelector('.file');

 
                let resultOfChecking = true;

                if (!author.value) resultOfChecking =  showError(author);
                if (!name.value) resultOfChecking = showError(name);
                if (genres.value == 'default') resultOfChecking = showError(genres);
                if (!file.files.length) resultOfChecking = showError(file.labels[0]);

                return resultOfChecking;
                function showError(el) {
                    el.addEventListener('transitionend', () => el.classList.remove('error'), {once: true});
                    el.classList.add('error');
                    return false;
                }
             }
        }
    }
</script>

<style lang="scss" scoped>
    .uploadForm {
        display: flex;
        flex-flow: column;
        max-width: 350px;
        margin: 10px 50px 0 0;
        padding: 40px 0;
        max-width: 300px;
    }
    input, select, .uploadFile {
    padding: 0 10px;
    height: 30px;
    box-sizing: border-box;
    width: 200px;
    text-align: left;
    transition: 500ms;
    }
    .uploadFile {
        background-color: white;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 11px;
        overflow: hidden;
    }
    .form-header {
        font-size: 30px;
    }
    .error {
        transform: scale(.9);
        background-color: #dd2c00;
    }
</style>