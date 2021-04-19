<template>
    <audio @timeupdate="progressUpdate" id="audio" :src="currentAudio.src"></audio>
    <div class="player">
        <ul class="player-buttons">
            <li @click="flipping" class="player-buttons-btn player-buttons-prev"><img class="player-buttons-img" src="/icons/arrow.svg"></li>
            <li @click="switchPlay" v-if="!play" class="player-buttons-btn player-buttons-play"><img class="player-buttons-img" src="/icons/play.svg"></li>
            <li @click="switchPlay" v-else class="player-buttons-btn player-buttons-play"><img class="player-buttons-img" src="/icons/pause.svg"></li>
            <li @click="flipping" class=" player-buttons-btn player-buttons-next"><img class="player-buttons-img" src="/icons/arrow.svg"></li>
        </ul>
        <p class="player-txt">{{currentAudio.author}} - {{currentAudio.name}}</p>
        <div class="player-progress" @click="audioRewind">
            <span class="player-time">{{time}}</span>
            <div class="player-progress-line"></div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                time: ''
            }
        },
        computed: mapState({
            play: 'play',
            user: 'user',
            status: 'status',
            currentAudio(state) {
                if (!state.currentAudio) return '';
                return state.currentAudio;
            }
        }),
        methods: {
            switchPlay() { 
                if (!this.$store.state.currentAudio) {//Включать первый трек при первом запуске
                     this.$store.commit('setCurrent', this.$store.state.tracks[0]);
                }
                this.$store.commit('switchPlay');
            },
            flipping(e) {
                let btn = e.target;
                if (btn.tagName == 'IMG') btn = btn.parentNode;

                let tracks = this.$store.getters.filteredTracks;
                let indexCurrentAudio = tracks.indexOf(this.currentAudio);
          
  
                if (btn.classList.contains('player-buttons-prev')) {
                    if (indexCurrentAudio > 0) {
                        this.$store.commit('setCurrent', tracks[indexCurrentAudio - 1]);
                        if (!this.play) this.switchPlay();
                        }
                    return;
                }
                if (btn.classList.contains('player-buttons-next')) {
                    if (indexCurrentAudio < tracks.length - 1 && indexCurrentAudio > -1) {
                        this.$store.commit('setCurrent', tracks[indexCurrentAudio + 1]);
                        if (!this.play) this.switchPlay();
                        }
                    return;
                }
            },
            progressUpdate(e) {
                let audioElem = e.target;
                let progressElem = document.querySelector('.player-progress');
                let progressLineElem = document.querySelector('.player-progress-line');

                let onePercent = progressElem.clientWidth / 100;  
                let passedPercent = 100 * audioElem.currentTime / audioElem.duration;

                progressLineElem.style.width = onePercent * passedPercent + 'px';

                let min = Math.floor(audioElem.currentTime / 60);
                let sec = Math.floor(audioElem.currentTime - min * 60);
                min = min.toString();
                if (min.length < 2) min = '0' + min;
                sec = sec.toString();
                if (sec.length < 2) sec = '0' + sec;
                this.time = `${min}:${sec}`;
            },
            audioRewind(e) {
                let audioElem = document.getElementById('audio');
                let progressElem = document.querySelector('.player-progress');

                audioElem.currentTime = audioElem.duration * e.offsetX / progressElem.clientWidth;
            }
        },
        watch: {
            play(val) {
                let audioElem = document.getElementById('audio');
                let attr = audioElem.getAttribute('src');
    
                if (attr && val) audioElem.play();
                if (attr && !val) audioElem.pause();
            },
            currentAudio(val) {
                let audioElem = document.getElementById('audio');

                setTimeout(() => {
                           audioElem.play()
                       }, 0);
            }
        }
    }
</script>

<style lang="scss">
    .player {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        border-bottom: 1px solid;
        &-buttons {
            padding-left: 0;
            margin: 35px 0px 0px;
            list-style: none;
            display: flex;
            width: 400px;
            align-items: center;
            justify-content: center;
            &-img {
                width: 50%;
            }
            &-btn {
                cursor: pointer;
                border: 2px solid;
                color: #051e36;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 10px;
            }
            &-play {
                width: 50px;
                height: 50px;
            }
            &-prev, &-next{
                width: 40px;
                height: 40px;
            }
            &-next {
                transform: rotate(180deg);
            }
        }
        &-txt {
            margin: 18px 0 31px;
        }
        &-progress {
            width: 100%;
            height: 15px;
            background: #e980fb;
            text-align: center;
            position: relative;
            &-line {
                background: #061d36;
                height: 100%;
                width: 0;
            }
        }
        &-time {
            position: absolute;
            left: 0;
            right: 0;
        }
    }
</style>