<template>
    <header-comp></header-comp>
    <div class="main">
        <audio-list-comp/>
        <sidebar-comp/>
    </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import AudioList from '@/components/Audio-list.vue';
  export default {
    data() {
      return {
        
      }
    },
    components: {
      'header-comp': Header,
      'sidebar-comp': Sidebar,
      'audio-list-comp': AudioList
    }
  }
</script>

<style lang="scss">
    .main {
        display: flex;
        justify-content: space-between;
    }
</style>