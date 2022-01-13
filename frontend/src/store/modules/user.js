
import Api from '../../API/API'
const state = {
   status: "", profile: {} 
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.lastName
};

const actions = {

  USER_DELETE_PROFILE : ({ commit, dispatch }) => new Promise((response, reject) =>  {
    commit('USER_REQUEST');
    Api.delete('user/delete')
      .then(resp => {
        commit('USER_SUCCESS');
        dispatch('AUTH_LOGOUT');
        response(resp.data);
      })
      .catch((error) => {
        commit('USER_ERROR');
        reject(error)
      });
  }),

  USER_REQUEST : ({ commit, dispatch }) => new Promise((response, reject) =>  {
    commit('USER_REQUEST');
    Api.get('user/me')
      .then(resp => { 
        commit('USER_SUCCESS');
        commit('USER_SAVE_PROFILE', resp.data);
        response(resp);
      })
      .catch((error) => { 
        commit('USER_ERROR');
     // if resp is unauthorized, logout, to
       dispatch('AUTH_LOGOUT');
        reject(error)
      });
  }),
  USER_SIGN_UP: ({ commit },NewUser) => new Promise((response, reject) =>  {
    commit('USER_REQUEST');
    Api.post('user/signup', NewUser)
      .then((res) => {
        
        commit('USER_SUCCESS');
        response(res.data);
      })
      .catch((error) => {
       console.log( error.response.data);
        commit('USER_ERROR');
        reject(error.response.data.error)
      })
  }),
  UPLOAD_IMAGE: ({commit}, formData) => new Promise((response, reject) =>{
    Api.put('user/update', formData)
    .then((res) => {
      commit('USER_SAVE_PROFILE', res.data.user);
      response(res)
    })
    .catch((error) => reject(error.response.data.error))
  }),

  UPDATE_USER_INFO: ({commit}, user) => new Promise((response, reject) =>{
    Api.put('user/update', user)
    .then((res) => {
      commit('USER_SAVE_PROFILE', res.data.user);
      response(res)
    })
    .catch((error) => reject(error.response.data.error))
  }),

  UPDATE_USER_PASSWORD: ({dispatch}, user) => new Promise((response, reject) =>{
    Api.put('user/updateMdp', user)
    .then((res) => {
      dispatch('USER_REQUEST')
      response(res)
    })
    .catch((error) => reject(error.response.data.error))
  }),
  DELETE_IMAGE: ({commit}) => new Promise((response, reject) =>{
    Api.delete('user/deletePic')
    .then((res) => {
      commit('USER_DELETE_PROFILE_PIC');
      response(res)
    })
    .catch((error) => reject(error.response.data.error))
  }),

};


const mutations = {
  USER_REQUEST: state => {
    state.status = "loading";
  },
  USER_SUCCESS: (state) => {
    state.status = "success";
  },
  USER_SAVE_PROFILE: (state, resp) => {
   state.profile = resp;
  },
  USER_ERROR: state => {
    state.status = "error";
  },
  AUTH_LOGOUT: state => {
    state.profile = {};
    state.status ="";
  },
  USER_DELETE_PROFILE_PIC:(state) =>{
  state.profile.profile_picture = "";
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};
