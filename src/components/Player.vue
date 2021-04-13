<template>
    <audio @timeupdate="progressUpdate" id="audio"></audio>
    <div class="player">
        <ul class="player-buttons">
            <li data-prev class="player-buttons-btn player-buttons-prev">prev</li>
            <li v-if="!play" class="player-buttons-btn player-buttons-play">Play</li>
            <li v-else class="player-buttons-btn player-buttons-play">Pause</li>
            <li data-next class=" player-buttons-btn player-buttons-next">next</li>
        </ul>
        <p class="player-txt">Автор - название аудио</p>
        <div class="player-progress" @click="audioRewind">
            <span class="player-time">время</span>
            <div class="player-progress-line"></div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        computed: mapState(['play'])
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
            list-style: none;
            display: flex;
            width: 400px;
            align-items: center;
            justify-content: center;
            &-btn {
                border-radius: 50px;
                background-color: white;
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
        }
    }
</style>