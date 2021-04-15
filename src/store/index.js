import { createStore } from 'vuex'

export default createStore({
  state: {
    play: false,
    currentAudio: null,
    tracks: [{
      name: 'Все что было',
      author: 'Петр Лещенко',
      src: 'audio/petr.mp3'
    }, {
      name: 'Группа крови',
      author: 'Виктор Цой',
      src: 'audio/vik.mp3'
    }]
  },
  mutations: {
    switchPlay: state=>state.play = !state.play,
    setCurrent: (state, audio) => state.currentAudio = audio
  },
  actions: {
  },
  modules: {
  }
})
