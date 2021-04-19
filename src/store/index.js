import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    authCompleted: false,
    isLoggedIn: false,
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
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
    setAuthComp: state => state.authCompleted = !state.authCompleted,
    switchPlay: state => state.play = !state.play,
    setCurrent: (state, audio) => state.currentAudio = audio,
    setFilterParams: (state, params) => {
      state.filterParams = params;
    },
    auth_request(state){
      state.status = 'loading';
    },
    auth_success(state, data){
      state.status = 'success';
      state.user = data.user;
      state.isLoggedIn = true;

      if (!state.token) state.token = data.token;
    },
    auth_error(state){
      state.status = 'error';
    },
    logout(state){
      state.status = '';
      state.token = '';
      state.user = {};
      state.isLoggedIn = false;
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
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/registration', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token

          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', resp.data)//r
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
     },
     login({commit}, user){
      return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://localhost:3000/login', data: user, method: 'POST' })
          .then(resp => {
              const token = resp.data.token

              localStorage.setItem('token', token)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', resp.data)
              resolve(resp)
          })
          .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              reject(err)
          })
      })
  },
  logout({commit}){
    return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
    })
  }
  },
  modules: {
  }
})
