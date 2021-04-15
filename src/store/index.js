import { createStore } from 'vuex'

export default createStore({
  state: {
    play: false,
    currentAudio: null,
    filterParams: {
      search: '',
      genres: []
    },
    tracks: [{
      name: 'Все что было',
      author: 'Петр Лещенко',
      src: 'audio/petr.mp3',
      genre: 'pop'
    }, {
      name: 'Группа крови',
      author: 'Виктор Цой',
      src: 'audio/vik.mp3',
      genre: 'rock'
    }]
  },
  mutations: {
    switchPlay: state=>state.play = !state.play,
    setCurrent: (state, audio) => state.currentAudio = audio,
    setFilterParams: (state, params) => {
      state.filterParams = params;
    }
  },
  getters: {
    filteredTracks(state) {
      let filteredTracks = state.tracks;

      if (state.filterParams.search) {
        filteredTracks = filteredTracks.filter(item=>{
          return item.name.includes(state.filterParams.search) || 
               item.author.includes(state.filterParams.search)
        })
      }
      
      if (state.filterParams.genres.length != 0) {
        filteredTracks = filteredTracks.filter(item=>{
          for (let i = 0; i < state.filterParams.genres.length; i++) {
            if (state.filterParams.genres[i] == item.genre) return true;
          }
        });
      }
      

      if (!filteredTracks.length) {
        console.log('Ничего не найдено'); //Показать пользователю, что ничего не найдено.
        return state.tracks;
      }
      return filteredTracks;
    }
  },
  actions: {
  },
  modules: {
  }
})
