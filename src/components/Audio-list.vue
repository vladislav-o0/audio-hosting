<template>
    <div class="audio-list" :class="audioListState">
        <transition-group appear @before-leave="beforeLeave" @before-enter="beforeEnter" tag="div">
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
    data() {
        return {
           audioFirstAdd: false 
        }
    },
    components: {
        'audio-comp': Audio,
        'self-audio-comp': SelfAudio
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['filtration']),
        filtered() {

            let path = this.$route.path;

            if (path != '/profile') return this.filtration.filteredTracks;

            return this.filtration.filteredTracks.filter((item) => { //Отсортировать чужие аудио
                return item.user_id == this.user.id;
            });
            
        },
        audioListState() {
            if (this.filtered.length) return 'audio-list-opened';
            return 'audio-list-closed';
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
        },
        beforeEnter(el) {
            if (this.audioFirstAdd && this.$route.path == '/profile') {

                el.addEventListener('transitionend', () => {
                    el.style.transitionDelay = '';
                    if (this.audioFirstAdd) this.audioFirstAdd = false;
                }, {once: true});

                el.style.transitionDelay = '.8s';

            }
        }
    },
    watch: {
        audioListState(newV, oldV) {
            if (oldV == 'audio-list-closed') this.audioFirstAdd = true;
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
.audio-list {
    transition: 1s;
    position: relative;
}
.audio-list-closed {
    transition-delay: 2s;
    width: 0;
}
.audio-list-opened {
    width: 380px;
    max-width: 100%;
    @media (min-width: 600px) and (max-width: 850px) {
        width: 550px;
    }
}

</style>