<template>
    <div class="sidebar">
        <form class="filter" action="">
            <input v-model="search" class="filter-search" type="text" placeholder="Исполнитель или название трека">
            <div class="filter-genre">
                <transition>
                    <h3 v-if="filtration.filterStatus == 'success'" class="filter-genre-title">Жанры</h3>
                    <h3 v-else class="filter-genre-title">Ничего не найдено</h3>
                </transition>
                <label @mousedown.prevent class="filter-genre-label" v-for="(value, key) in genres" :class="toggleActive(key)">
                    <input v-model="selectedGenres" hidden type="checkbox" name="genre" :value="key">
                    {{value}}
                </label>
            </div>
            <button @click.prevent="setFilterParams" class="filter-btn">Применить</button>
        </form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                search: '',
                selectedGenres: []
            }
        },
        computed: {
            ...mapState({
                genres(state) {
                    let res = {};
                    for(let genre in state.genres) {
                        if (genre != 'default') {
                            res[genre] = state.genres[genre];
                        }
                    }
                    return res;
                }
            }),
            ...mapGetters(['filtration'])
        },
        methods: {
            toggleActive(genre) {
                return {'filter-genre-label-checked': this.selectedGenres.includes(genre)}
            },
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
        max-width: 100%;
        @media (max-width: 850px) {
            padding-bottom: 15px;
        }
    }
    .filter {
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
        &-btn {
            width: 118px;
            height: 42px;
            background-color: #051d36;
            border: none;
            color: wheat;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 17px;
            outline: none;
        }
        &-search {
            border: none;
            width: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            box-shadow: 0px 0px 5px;
            height: 30px;
            background-color: #fff;
            border-radius: 5px;
            margin: 15px;
            display: flex;
            align-items: center;
        }
        &-genre {
            display: flex;
            flex-flow: row wrap;
            margin: 0 -4px;
            overflow: hidden;
            position: relative;
            &-title {
                width: 100%;
                text-align: center;
                font-size: 18px;
                text-transform: uppercase;
            }
            &-label {
                font-size: 14px;
                background-color: rgba(255,255,255,.7);
                border-radius: 5px;
                height: 30px;
                margin: 4px;
                cursor: pointer;
                box-shadow: 0px 0px 5px black;
                text-align: center;
                flex-grow: 1;
                padding: 0 5px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                &-checked {
                    background-color: white;
                }
            }
        }
    }
</style>