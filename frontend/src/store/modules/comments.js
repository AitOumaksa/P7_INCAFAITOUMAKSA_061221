
import Api from '../../API/API'

const state = { status: "" };

const getters = {
 
};

const actions = {
  //ajouter commentaire 
  ADD_COMMENT: ({commit}, info) => new Promise((response, reject) =>{
    commit('COMMENTS_REQUEST')
    Api.post(`posts/${info.postId}/comments`, {"commentmessage" : info.commentmessage})
    .then((res) => {
      commit('SET_NEW_POST_COMMENT', { comment : res.data.newComment[0], postId : res.data.postid});
      commit('COMMENTS_SUCCESS')
      response(res.data)
    })
    .catch((error) => {
       commit('COMMENTS_ERROR');
       reject(error.response.data.error)});
  }),
  //mis à jour un commentaire 
  UPDATE_COMMENT: ({commit}, editComment) => new Promise((response, reject) =>{
    commit('COMMENTS_REQUEST')
    Api.put(`posts/${editComment.id}/updateCmnt`, {"commentmessage" : editComment.message })
    .then((res) => {
     
      commit('SET_UPDATE_POST_COMMENT', res.data.updateComment[0])
      commit('COMMENTS_SUCCESS')
      response(res.data)
    })
    .catch((error) => {
       commit('COMMENTS_ERROR');
       console.log(error.response)
       reject(error.response)});
  }),
  //suprimer un commentaire 
  DELETE_COMMENT: ({commit}, commentId) => new Promise((response, reject) =>{
    commit('COMMENTS_REQUEST')
    Api.delete(`posts/comments/${commentId}`)
    .then((res) => {
     
      commit('UNSET_POST_COMMENT',commentId)
      commit('COMMENTS_SUCCESS')
      
      response(res.data)
    })
    .catch((error) =>{
    commit('COMMENTS_ERROR');
     reject(error.response.data)})
  }),

};


const mutations = {


  COMMENTS_REQUEST: state => {
    state.status = "loading";
  },
  COMMENTS_SUCCESS: (state) => {
    state.status = "success";
  },
  COMMENTS_ERROR: state => {
    state.status = "error";
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
