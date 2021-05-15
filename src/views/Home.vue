<template>
    <header-comp/>
    <player-comp/>
    <div class="main wrapper">
        <audio-list-comp/>
        <sidebar-comp/>
    </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Player from '@/components/Player.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import AudioList from '@/components/Audio-list.vue';
  
  export default {
    data() {
      return {
        
      }
    },
    components: {
      'header-comp'    : Header,
      'player-comp'    : Player,
      'sidebar-comp'   : Sidebar,
      'audio-list-comp': AudioList
    }
  }
</script>

<style lang="scss">
    .main {
        display: flex;
        justify-content: space-between;
        padding-top: 25px;
        @media (max-width: 850px) {
          flex-flow: column-reverse wrap;
          align-items: center;
        }
    }
</style>