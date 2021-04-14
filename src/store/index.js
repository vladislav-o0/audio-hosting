import { createStore } from 'vuex'

export default createStore({
  state: {
    play: false,
    currentAudio: null,
    tracks: [{
      name: 'Все что было',
      author: 'Петр Лещенко',
      src: '@/assets/audio/petr.mp3'
    }, {
      name: 'Группа крови',
      author: 'Виктор Цой',
      src: '@/assets/audio/vik.mp3'
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
