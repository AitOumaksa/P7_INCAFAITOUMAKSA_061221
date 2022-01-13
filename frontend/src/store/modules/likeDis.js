import Api from '../../API/API'

const state = {
    
     status: "" 
};

const getters = {
 
};
const actions = {
     SEND_LIKE: ({commit},like) => new Promise((response, reject) =>{
          Api.post(`posts/${like.postId}/like`)
          .then(() => {
          commit('SET_POST_LIKE',like)
          })
          .catch((error) => reject(error))
     }),
     SEND_DISLIKE: ({commit}, dislike) => new Promise((response, reject) =>{
          Api.post(`posts/${dislike.postId}/dislike`)
          .then(() => {
          commit('SET_POST_DISLIKE',dislike)
          })
          .catch((error) => reject(error))
     }),


};
const mutations = {
LIKE_DIS_REQUEST: state => {
 state.status = "loading";
},
LIKE_DIS_SUCCESS: (state) => {
 state.status = "success";
},
LIKE_DIS_ERROR: state => {
 state.status = "error";
},
      
}
export default {
     state,
     getters,
     actions,
     mutations
   };