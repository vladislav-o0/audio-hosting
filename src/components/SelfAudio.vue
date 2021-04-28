<template>
    <div class="audio">
        <p>{{audio.author}} - {{audio.name}}</p><span @click="remove(audio)" class="audio-remove">Удалить</span>
    </div>
</template>

<script>
    import { backendHostname } from '@/backendHostname.js';

    export default {
        props: ['audio'],
        methods: {
            remove(audio) {
                this.axios.post(backendHostname + '/removeTrack', audio)
                .then((res) => {
                    console.log('Успешно удален')
                    this.$store.dispatch('getTracks');
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .audio {
        box-shadow: 0px 0px 7px;
        width: 350px;
        height: 30px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        padding: 0 15px;
        &-remove {
            background-color: #051d36;
            color: white;
            padding: 2px 19px;
            font-size: 12px;
            border-radius: 5px;
            cursor: pointer; 
        }
    }
</style>