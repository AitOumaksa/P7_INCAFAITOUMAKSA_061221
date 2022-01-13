

import Api from '../../API/API'



const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  AUTH_REQUEST: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      Api.post('user/login', user)
        .then(resp => {
          localStorage.setItem("user-token", resp.data.token);
          Api.defaults.headers.common['Authorization'] = 'Bearer '+resp.data.token;
          commit('AUTH_SUCCESS', resp.data.token);
          dispatch('USER_REQUEST')
          .then(()=> resolve(resp.data))
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
  AUTH_LOGOUT: ({ commit }) => {
    return new Promise(resolve => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem("user-token");
      resolve();
    });
  }
};

const mutations = {
  AUTH_REQUEST: state => {
    state.status = "loading";
  },
  AUTH_SUCCESS: (state, token) => {
    state.status = "success";
    state.token = token;
    
  },
  AUTH_ERROR: state => {
    state.status = "error";
   
  },
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
