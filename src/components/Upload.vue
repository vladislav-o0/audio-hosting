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
        <input type="submit" :style="uploadBtnColor" class="form-btn" :value="uploadStatus">
    </form>
</template>

<script>
    import { mapState } from 'vuex';
    import { backendHostname } from '@/backendHostname.js';

    export default {
        data() {
            return {
                fileName: 'Выберите аудио',
                uploadPercentage: 0,
                isUpload: false
            }
        },
        computed: {
            ...mapState(['genres']),
            uploadBtnColor() {
                return {background: `linear-gradient(to right, #36b23a ${this.uploadPercentage}%, #051d36 ${this.uploadPercentage}%)`}
            },
            uploadStatus() {
                return this.isUpload?'Загружается...':'Добавить';
            }
        },
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

                this.isUpload = true;

                this.axios.post(
                    backendHostname + '/upload',
                    formData,
                    {
                        headers: {'Content-Type': 'multipart/form-data'},
                        onUploadProgress: function (progressEvent) {
                            this.uploadPercentage = Math.round(( progressEvent.loaded / progressEvent.total) * 100);
                        }.bind(this)
                    }
                )
                .then(() => {
                    this.uploadPercentage = 0;
                    this.isUpload = false;
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
        @media (max-width: 730px) {
            margin: 0 0 20px;
            width: 100%;
            box-sizing: border-box;
        }
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