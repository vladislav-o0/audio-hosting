<template>
    <div class="audio">
        <div @click="setPlay" v-if="!play" class="audio-btn"><img class="audio-btn-img" src="/icons/play.svg"></div>
        <div @click="setPause" v-else class="audio-btn"><img class="audio-btn-img" src="/icons/pause.svg"></div>
        <div>{{audio.author}} - {{audio.name}}</div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        props: ['audio'],
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
            }
        }
    }
</script>

<style lang="scss">
    .audio {
        box-shadow: 0px 0px 7px;
        width: 500px;
        height: 30px;
        background-color: #fff;
        border-radius: 5px;
        margin: 15px;
        display: flex;
        align-items: center;
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