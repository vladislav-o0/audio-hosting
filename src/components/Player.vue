<template>
    <audio @timeupdate="progressUpdate" id="audio" :src="currentAudioSrc"></audio>
    <div class="player">
        <ul class="player-buttons">
            <li @click="flipping" @mousedown.prevent class="player-buttons-btn player-buttons-prev"><img class="player-buttons-img" src="/icons/arrow.svg"></li>
            <li @click="switchPlay" @mousedown.prevent v-if="!play" class="player-buttons-btn player-buttons-play"><img class="player-buttons-img" src="/icons/play.svg"></li>
            <li @click="switchPlay" @mousedown.prevent v-else class="player-buttons-btn player-buttons-play"><img class="player-buttons-img" src="/icons/pause.svg"></li>
            <li @click="flipping" @mousedown.prevent class=" player-buttons-btn player-buttons-next"><img class="player-buttons-img" src="/icons/arrow.svg"></li>
        </ul>
        <p class="player-txt" ref="textAudioNameWrapperEl"><span ref="textAudioNameEl" v-if="currentAudio">{{currentAudio.author}} - {{currentAudio.name}}</span></p>
        <div class="player-progress" @click="audioRewind">
            <span class="player-time">{{time}}</span>
            <div class="player-progress-line"></div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import { backendHostname } from '@/backendHostname.js';

    let moveTextId;
    
    export default {
        data() {
            return {
                time: ''
            }
        },
        computed: {
            ...mapState({
                play: 'play',
                user: 'user',
                status: 'status',
                currentAudio(state) {
                    if (!state.currentAudio) return '';
                    return state.currentAudio;
                }
            }),
            currentAudioSrc() {
                if (!this.currentAudio.src) return '';
                return backendHostname + '/' + this.currentAudio.src;
            }
        },
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

                let tracks = this.$store.getters.filtration.filteredTracks;

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
                if (this.$route.path != '/') { //Переключаем кнопку если перешли на другую вкладку
                    this.switchPlay();
                    return;
                }
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

                if (val) {

                    this.$nextTick(() => {
    
                        let textAudioNameWrapperEl = this.$refs.textAudioNameWrapperEl;
                        let textAudioNameEl = this.$refs.textAudioNameEl;

                        let txtElWidth = textAudioNameEl.offsetWidth;
                        let txtWrapperWidth = textAudioNameWrapperEl.offsetWidth;
                        let difference = txtElWidth - txtWrapperWidth;

                        textAudioNameEl.style.transition = `0s linear`;
                        textAudioNameEl.style.transform = `translateX(0px)`;
                
                        if (difference <= 0) {
                            textAudioNameEl.style.transform = ``;
                            return;
                        } 
                        
                        clearTimeout(moveTextId);
                        
                        let delay;

                        let moveText = (function() {

                            if (this.currentAudio != val) {
                                return;
                            }

                            if (textAudioNameEl.style.transform == `translateX(0px)`) {
                                textAudioNameEl.style.transition = `2s linear`;
                                textAudioNameEl.style.transform = `translateX(-${difference}px)`;
                                delay = 3000;
                            } else {
                                textAudioNameEl.style.transition = `0s linear`;
                                textAudioNameEl.style.transform = `translateX(0px)`;
                                delay = 1000;
                            }

                            moveTextId = setTimeout(moveText, delay);
                            
                        }).bind(this);

                        moveTextId = setTimeout(moveText, 1000);
                    })
                    
                }

                setTimeout(() => {
                           audioElem.play();
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
        &-buttons {
            padding-left: 0;
            margin: 35px 0px 0px;
            list-style: none;
            display: flex;
            width: 400px;
            max-width: 100%;
            align-items: center;
            justify-content: center;
            &-img {
                width: 50%;
            }
            &-btn {
                box-shadow: 0px 0px 8px;
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
                box-shadow: 0px 0px 5px;
            }
            &-next {
                transform: rotate(180deg);
            }
        }
        &-txt {
            margin: 18px 0 31px;
            overflow: hidden;
            width: 90%;
            white-space: nowrap;
            text-align: center;
            span {
                display: inline-block;
            }
        }
        &-progress {
            width: 100%;
            height: 15px;
            background: white;
            text-align: center;
            position: relative;
            display: flex;
            align-items: center;
            box-shadow: inset 0px 0px 15px -6px;
            cursor: pointer;
            &-line {
                background: #ffbf00bf;
                width: 0;
                height: 96%;
                border-radius: 0 5px 5px 0;
                box-shadow: 1px 0 10px -3px;
            }
        }
        &-time {
            position: absolute;
            left: 0;
            right: 0;
        }
    }
</style>