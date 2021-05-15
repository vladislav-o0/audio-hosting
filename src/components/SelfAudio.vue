<template>
    <div class="audio">
        <p @mouseover="textMoveOn" @mouseout="textMoveOff" class="audio-paragraph" ref="audioNameWrapper">
            <span ref="audioName">{{audio.author + ' - ' + audio.name}}</span>
        </p>
        <span class="audio-remove">
            <img @click="remove(audio)" src="/icons/remove.svg" alt="Delete">
        </span>
    </div>
</template>

<script>
    import { backendHostname } from '@/backendHostname.js';

    export default {
        props: ['audio'],
        data() {
            return {
                audioNameWrapperEl: null,
                audioNameEl: null,
                textMoveStopped: false
            }
        },
        methods: {
            remove(audio) {
                this.axios.post(backendHostname + '/removeTrack', audio)
                .then((res) => {
                    console.log('Успешно удален')
                    this.$store.dispatch('getTracks');
                })
            },
            textMoveOn() {
                    let text = this.audioNameEl;
                    let wrapper = this.audioNameWrapperEl;
                    let stop = this.textMoveStopped;
 
                    if (stop) {
                        this.textMoveStopped = false;
                        return;
                    }

                    text.style.transition = '2s';

                    let width = text.offsetWidth - wrapper.offsetWidth;

                    if (width < 0) return;

                    text.style.transform = 'translateX(' + -width + 'px)';
                    
                    setTimeout(() => {
                        text.style.transition = '0s';
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
        height: 30px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        padding: 0 15px;
        right: 0;
        box-sizing: content-box;
        @media (min-width: 600px) and (max-width: 850px) {
            width: 100%;
            box-sizing: border-box;
        }
        &-paragraph {
            white-space: nowrap;
            width: 90%;
            overflow: hidden;
            span {
                display: inline-block;
            }
        }
        &-remove {
            display: inline-flex;
            justify-content: flex-end;
            flex-grow: 1;
            color: white;
            font-size: 12px;
            border-radius: 5px; 
            img {
                width: 19px;
                cursor: pointer;
            }
        }
    }
</style>