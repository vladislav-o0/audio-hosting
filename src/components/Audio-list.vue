<template>
    <div class="audio-list">
        <audio-comp v-for="n in 10"></audio-comp>
    </div>
</template>

<script>
    import Audio from '@/components/Audio.vue';
    export default {
        components: {
            'audio-comp': Audio
        }
    }
</script>

<style lang="scss">

</style>