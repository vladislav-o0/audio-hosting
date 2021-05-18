<template>
    <div class="audio">
        <div @click="setPlay" v-if="!play" class="audio-btn"><img class="audio-btn-img" src="/icons/play.svg"></div>
        <div @click="setPause" v-else class="audio-btn"><img class="audio-btn-img" src="/icons/pause.svg"></div>
        <p @mouseover="textMoveOn" @mouseout="textMoveOff" class="audio-paragraph" ref="audioNameWrapper">
            <span ref="audioName">{{audio.author + ' - ' + audio.name}}</span>
        </p>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        props: ['audio'],
        data() {
            return {
                audioNameWrapperEl: null,
                audioNameEl: null,
                textMoveStopped: false
            }
        },
        computed: mapState({
            play(state) {
                if (state.currentAudio == this.audio && state.play) return true;
                return false;
            },
        }),
        methods: {
            ...mapMutations(['switchPlay', 'setCurrent']),
            setPlay() {
                if (this.$store.state.currentAudio == this.audio) return this.switchPlay(); //если на себя же

                if (!this.$store.state.currentAudio || !this.$store.state.play) { //если в первый раз или не играет и на новый
                    this.setCurrent(this.audio);
                    this.switchPlay();
                    return;
                }
                
                if (this.$store.state.play) { // если играет и на новый
                    this.setCurrent(this.audio); 
                }
            },
            setPause() {
                this.switchPlay();
            },
            textMoveOn() {

                    let text = this.audioNameEl;
                    let wrapper = this.audioNameWrapperEl;
                    let stop = this.textMoveStopped;

                    if (!wrapper) {
                        //если анимация. Ждем ее конца
                        setTimeout(this.textMoveOn, 1000);
                        return;
                    }
 
                    if (stop) {
                        this.textMoveStopped = false;
                        return;
                    }

                    text.style.transition = '2s linear';

                    let width = text.offsetWidth - wrapper.offsetWidth;

                    if (width < 0) return;

                    text.style.transform = 'translateX(' + -width + 'px)';
                    
                    setTimeout(() => {
                        text.style.transition = '0s linear';
                        text.style.transform = 'translateX(0px)';
                        setTimeout(this.textMoveOn, 500);
                    }, 2500);
            },
            textMoveOff() {
                this.textMoveStopped = true;
            }
        },
        mounted() {
            this.audioNameEl = this.$refs.audioName;
     
            if (this.$refs.audioNameWrapper.offsetWidth) {
                this.audioNameWrapperEl = this.$refs.audioNameWrapper;
         
                return this.audioNameWrapperEl;
            } //если анимации нет, значит ширина доступна сразу
            
            setTimeout(() => {
                this.audioNameWrapperEl = this.$refs.audioNameWrapper
            }, 1000); //иначе ширина доступна после завершения анимации
        }
    }
</script>

<style lang="scss" scoped>
    .audio {
        box-shadow: 0px 0px 7px;
        width: 500px;
        height: 30px;
        padding-right: 10px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 5px;
        margin: 15px;
        display: flex;
        align-items: center;
        @media (max-width: 850px) {
            margin: 15px 0;
            width: 100%;
        }
        &-paragraph {
            white-space: nowrap;
            width: 90%;
            overflow: hidden;
            span {
                display: inline-block;
            }
        }
        &-btn {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            &-img {
                width: 50%;
            }
        }
    }
</style>