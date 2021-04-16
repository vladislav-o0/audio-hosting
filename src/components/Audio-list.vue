<template>
    <div class="audio-list">
        <transition-group appear @before-leave="beforeLeave"  tag="div">
        <audio-comp v-for="(track) in filteredTracks" :key="track.name" :audio="track"></audio-comp>
        </transition-group>
    </div>
</template>

<script>
    import Audio from '@/components/Audio.vue';

    import { mapGetters } from 'vuex';
    export default {
        components: {
            'audio-comp': Audio
        },
        computed: mapGetters(['filteredTracks']),
        methods: {        
            beforeLeave(el) {
                let {marginLeft, marginTop} = window.getComputedStyle(el);
              
                el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
                el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`; 
            }  
        }
    }
</script>

<style lang="scss">
    .v-leave-to, .v-enter-from {
        transform: translateX(-15px);
        opacity: 0;
    }
    .v-leave-active, .v-enter-active {
        transition: 2s;
    }
    .v-move {
        transition: 2s;
    }
    .v-leave-active {
        position: absolute;
    }  
</style>