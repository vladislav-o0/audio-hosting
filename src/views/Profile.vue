<template>
    <header-comp></header-comp>
    <div class="wrapper">
        <upload-comp></upload-comp>
        <audio-list-comp></audio-list-comp>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';
    import Upload from '@/components/Upload.vue';
    import AudioList from '@/components/Audio-list.vue';

    export default {
        components: {
            'header-comp': Header,
            'upload-comp': Upload,
        'audio-list-comp': AudioList
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        padding-top: 50px;
        display: flex;
        justify-content: center;
    }
</style>