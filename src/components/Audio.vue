<template>
    <div class="audio">
        <div @click="setPlay" v-if="!play" class="audio-btn">Play</div>
        <div @click="setPause" v-else class="audio-btn">Pause</div>
        <div>{{audio.author}}</div>
        <div>{{audio.name}}</div>
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
                if (this.$store.state.currentAudio == this.audio) return this.switchPlay(); 

                if (!this.$store.state.currentAudio || !this.$store.state.play) { 

                    this.setCurrent(this.audio);
                    this.switchPlay();
                    return;
                }
                
                if (this.$store.state.play) { 
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
        width: 500px;
        height: 30px;
        background-color: #fff;
        border-radius: 50px;
        margin: 15px;
        display: flex;
        &-btn {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: blue;
            border-radius: 50px;
            
        }
    }
</style>