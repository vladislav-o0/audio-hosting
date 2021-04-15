<template>
    <div class="audio-list">
        <audio-comp v-for="(track, i) in filteredTracks" :key="i" :audio="track"></audio-comp>
    </div>
</template>

<script>
    import Audio from '@/components/Audio.vue';

    import { mapGetters } from 'vuex';
    export default {
        components: {
            'audio-comp': Audio
        },
        computed: mapGetters(['filteredTracks'])
    }
</script>

<style lang="scss">

</style>