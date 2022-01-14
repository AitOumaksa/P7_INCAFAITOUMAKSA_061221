

import Api from '../../API/API'



const state = {
  //recuperation dans localStorge 
  token: localStorage.getItem("user-token") || "",
  status: "",
};

const getters = {
  //verifie si le token exist dans le state 
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  //Action qui envoie les infos utilisateur pour se connecter
  AUTH_REQUEST: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      Api.post('user/login', user)
        .then(resp => {
          //enregistrer le token dans le localStorge
          localStorage.setItem("user-token", resp.data.token);
          //ajouter le token dans l'entet des requete
          Api.defaults.headers.common['Authorization'] = 'Bearer '+resp.data.token;
          commit('AUTH_SUCCESS', resp.data.token);
          //appele l'action qui recupere le profile utilisateur 
          dispatch('USER_REQUEST')
          .then(()=> resolve(resp.data))
          //en cas d'échec executer la mutation 'AUTH_LOGOUT' 
          .catch((usererror)=>{ 
          commit('AUTH_LOGOUT');
          reject(usererror.response)})
          
         
        })
        .catch(error => {
          commit('AUTH_ERROR', error);
          commit('AUTH_LOGOUT');
          reject(error.response.data.error);
        });
    });
  },
  //action qui deconnecte l'utilisateur 
  AUTH_LOGOUT: ({ commit }) => {
    return new Promise(resolve => {
      //execution de la mutations 'AUTH_LOGOUT' 
      commit('AUTH_LOGOUT');
      //suprimer le token de localStorge
      localStorage.removeItem("user-token");
      resolve();
    });
  }
};

const mutations = {
  //changer le status dans le state 
  AUTH_REQUEST: state => {
    state.status = "loading";
  },
  //Change le status dans le state et sevgarder le token dans le state 
  AUTH_SUCCESS: (state, token) => {
    state.status = "success";
    state.token = token;
    
  },
  //changer le status dans le state 
  AUTH_ERROR: state => {
    state.status = "error";
   
  },
  //changer la valeur du token dans le state et le status 
  AUTH_LOGOUT: state => {
    state.token = "";
    state.status = "";

 
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
