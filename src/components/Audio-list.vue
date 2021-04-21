<template>
    <div class="audio-list">
        <transition-group appear @before-leave="beforeLeave"  tag="div">
        <component :is="currentComponent" v-for="(track) in filtered" :key="track.name" :audio="track"></component>
        </transition-group>
    </div>
</template>

<script>
    import Audio from '@/components/Audio.vue';
    import SelfAudio from '@/components/SelfAudio.vue';

    import { mapGetters } from 'vuex';
    import { mapState } from 'vuex';

    export default {
        components: {
            'audio-comp': Audio,
            'self-audio-comp': SelfAudio
        },
        computed: {
            ...mapState(['user']),
            ...mapGetters(['filteredTracks']),
            filtered() {
                let path = this.$route.path;

                if (path != '/profile') return this.filteredTracks;

                return this.filteredTracks.filter((item) => { //Отсортировать чужие аудио
                    return item.user_id == this.user.id;
                });
            },
            currentComponent() {
                let path = this.$route.path;

                if (path == '/') return 'audio-comp';
                else return 'self-audio-comp';
            }
        },
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