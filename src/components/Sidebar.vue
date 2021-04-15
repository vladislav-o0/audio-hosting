<template>
    <div class="sidebar">
        <form class="filter" action="">
            <input v-model="search" class="filter-search" type="text" placeholder="Исполнитель или название трека">
            <div class="filter-genre">
                <p>Жанры:</p>
                <label>
                    <input v-model="genres" type="checkbox" name="genre" value="pop">
                    Попса
                </label>
                <label>
                    <input v-model="genres" type="checkbox" name="genre" value="rock">
                    Рок
                </label>
                <label>
                    <input v-model="genres" type="checkbox" name="genre" value="rap">
                    Реп
                </label>
            </div>
            <button @click.prevent="setFilterParams">Применить</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
                genres: []
            }
        },
        methods: {
            setFilterParams() {
                this.$store.commit('setFilterParams', {
                    search: this.search,
                    genres: this.genres
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