<template>
    <div class="sidebar">
        <form class="filter" action="">
            <input v-model="search" class="filter-search" type="text" placeholder="Исполнитель или название трека">
            <div class="filter-genre">
                <p>Жанры:</p>
                <label v-for="(value, key) in genres">
                    <input v-model="selectedGenres" type="checkbox" name="genre" :value="key">
                    {{value}}
                </label>
            </div>
            <button @click.prevent="setFilterParams">Применить</button>
        </form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                search: '',
                selectedGenres: []
            }
        },
        computed: mapState(['genres']),
        methods: {
            setFilterParams() {
                this.$store.commit('setFilterParams', {
                    search: this.search,
                    selectedGenres: this.selectedGenres
                });
            }
        }
    }
</script>

<style lang="scss">
    .sidebar {
        width: 300px;
        height: 50px;
        border-left: 1px solid;
    }
    .filter {
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
        &-search {
            width: 90%;
            padding: 0 10px;
            box-sizing: border-box;
        }
    }
</style>