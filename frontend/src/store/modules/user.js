
import Api from '../../API/API'

const state = {
   status: "",
    profile: {} 
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.lastName
};

const actions = {
//action pour la supression du profile utilisteur 
  USER_DELETE_PROFILE : ({ commit, dispatch }) => new Promise((response, reject) =>  {
    commit('USER_REQUEST');
    Api.delete('user/delete')
      .then(resp => {
        commit('USER_SUCCESS');
        //appele l'action 'AUTH_LOGOUT'
        dispatch('AUTH_LOGOUT');
        response(resp.data);
      })
      .catch((error) => {
        commit('USER_ERROR');
        reject(error)
      });
  }),
//ACTION ,recupere le profile utilisateur 
  USER_REQUEST : ({ commit, dispatch }) => new Promise((response, reject) =>  {
    commit('USER_REQUEST');
    Api.get('user/me')
      .then(resp => { 
        commit('USER_SUCCESS');
        //appele la mutations 'USER_SAVE_PROFILE',
        commit('USER_SAVE_PROFILE', resp.data);
        response(resp);
      })
      .catch((error) => { 
        commit('USER_ERROR');
     // if resp is unauthorized, logout
       dispatch('AUTH_LOGOUT');
        reject(error)
      });
  }),
  //action traite l'inscription utilisateur 
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
  //Mis a jour de profile_picture 
  UPLOAD_IMAGE: ({commit}, formData) => new Promise((response, reject) =>{
    Api.put('user/update', formData)
    .then((res) => {
      //appele la mutation 'USER_SAVE_PROFILE'
      commit('USER_SAVE_PROFILE', res.data.user);
      response(res)
    })
    .catch((error) => reject(error.response.data.error))
  }),
  //Mis à jour des infos utilisateur 
  UPDATE_USER_INFO: ({commit}, user) => new Promise((response, reject) =>{
    Api.put('user/update', user)
    .then((res) => {
      //appele la mutation 'USER_SAVE_PROFILE'
      commit('USER_SAVE_PROFILE', res.data.user);
      response(res)
    })
    .catch((error) => reject(error.response.data.error))
  }),
  //Mis à jour de Mdp
  UPDATE_USER_PASSWORD: ({dispatch}, user) => new Promise((response, reject) =>{
    Api.put('user/updateMdp', user)
    .then((res) => {
      dispatch('USER_REQUEST')
      response(res)
    })
    .catch((error) => reject(error.response.data.error))
  }),
  //Supression de profile_picture
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
  //sevgarder le profile utilisateur dans le state 
  USER_SAVE_PROFILE: (state, resp) => {
   state.profile = resp;
  },
  USER_ERROR: state => {
    state.status = "error";
  },
  //deconnecter l'utilisateur et actualiser les valeur dans le state avec des valeur vide
  AUTH_LOGOUT: state => {
    state.profile = {};
    state.status ="";
  },
  //suprimer profile_picture dans le state 
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
