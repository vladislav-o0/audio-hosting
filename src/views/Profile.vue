<template>
    <header-comp></header-comp>
    <upload-comp></upload-comp>
</template>

<script>
    import Header from '@/components/Header.vue';
    import Upload from '@/components/Upload.vue';

    export default {
        components: {
            'header-comp': Header,
            'upload-comp': Upload
        }
    }
</script>

<style lang="scss">

</style>