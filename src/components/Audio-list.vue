<template>
    <div class="audio-list">
        <audio-comp v-for="(track, i) in tracks" :key="i" :audio="track"></audio-comp>
    </div>
</template>

<script>
    import Audio from '@/components/Audio.vue';

    import { mapState } from 'vuex';
    export default {
        components: {
            'audio-comp': Audio
        },
        computed: mapState(['tracks'])
    }
</script>

<style lang="scss">

</style>