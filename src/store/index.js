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
    }, {
      name: 'Пачка сигарет',
      author: 'Виктор Цой',
      src: 'audio/vik2.mp3',
      genre: 'rock'
    }, {
      name: 'Апрель',
      author: 'Виктор Цой',
      src: 'audio/vik3.mp3',
      genre: 'rock'
    }, {
      name: 'Надя, надечка',
      author: 'Петр Лещенко',
      src: 'audio/petr2.mp3',
      genre: 'pop'
    },{
      name: 'Эх, Андрюша',
      author: 'Петр Лещенко',
      src: 'audio/petr3.mp3',
      genre: 'pop'
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
          return item.name.toLowerCase().includes(state.filterParams.search.toLowerCase()) || 
               item.author.toLowerCase().includes(state.filterParams.search.toLowerCase())
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
