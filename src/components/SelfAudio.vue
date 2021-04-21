<template>
    <div class="audio">
        <div>{{audio.author}} - {{audio.name}}<span @click="remove(audio.src)">Удалить</span></div>
    </div>
</template>

<script>
    export default {
        props: ['audio'],
        methods: {
            remove(src) {
                this.axios.post('http://localhost:3000/removeTrack', {src: src})
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
        margin: 10px 0;
        padding: 0 15px;
    }
</style>