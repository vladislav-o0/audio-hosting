<template>
    <header-comp></header-comp>
    <upload-comp></upload-comp>
    <audio-list-comp></audio-list-comp>
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

<style lang="scss">

</style>