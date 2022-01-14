
import Api from '../../API/API'

const state = { status: "" , posts: [] };

const getters = {
 
};

const actions = {
  //Envoie des post 
  SEND_POST: ({commit}, post) => new Promise((response, reject) =>{
    Api.post('posts/add', post)
    .then((res) => {
      commit('SET_NEW_POST', res.data.post[0]);
      response(res)
    })
    .catch((error) => reject(error.response))
  }),
  //mis à jour du post
  UPDATE_POST : ({commit}, postInfo) => new Promise((response, reject) =>{
    Api.put('posts/'+postInfo.id, postInfo.post)
    .then((res) => {
      commit('UPDATE_POST', res.data.post[0]);
      response(res)
    })
    .catch((error) => reject(error.response))
  }),
  //recuperation des posts
  GET_ALL_POST: ({commit}, post) => new Promise((response, reject) =>{
    commit('POSTS_REQUEST')
    Api.get('posts', post)
    .then((res) => {
      commit('POSTS_SUCCESS');
      commit('POSTS_SAVE', res.data);
      response(res)
    })
    .catch((error) => {    commit('POSTS_ERROR');
    // if resp is unauthorized, logout, to
                           //dispatch('AUTH_LOGOUT');
                           reject(error.response)
                      })
  }),
//recupertion de posts utilisateur 
  GET_MY_POSTS: ({commit}) => new Promise((response, reject) =>{
    commit('POSTS_REQUEST')
    Api.get('posts/me')
    .then((res) => {
      commit('POSTS_SUCCESS');
      commit('POSTS_SAVE', res.data);
      response(res)
    })
    .catch((error) => {    commit('POSTS_ERROR');
    // if resp is unauthorized, logout, to
                           //dispatch('AUTH_LOGOUT');
                           reject(error.response)
                      })
  }),
  ///supression du post 
  DELETE_POST: ({commit}, postId) => new Promise((response, reject) =>{
    Api.delete(`posts/${postId}`)
    .then((res) => {
      commit('UNSET_POST',postId)
      
      response(res.data)
    })
    .catch((error) => reject(error.response))
  }),

};


const mutations = {

AUTH_LOGOUT: state => {
    state.posts=[];
    state.status="";
  },
//sevgarder nouveau post au debut de tableau 
SET_NEW_POST: (state, newPost) => {
    state.posts.unshift(newPost);
},
//mis à jour du post 
UPDATE_POST: (state, updatePost) => {
  let index ;
  //utiliser une boucle
  for(let post of state.posts)
  {
    //chercher lindex du post dans le tableau puis suprimer et et ajouter nouveau post au debut de tableau 
    if(post.id == updatePost.id) {
     index = state.posts.indexOf(post); 
     state.posts.splice(index,1);
     state.posts.unshift(updatePost);
     break }
 
  } 
  
},
//supression du post 
UNSET_POST: (state, postId) => {
let index ;
 for(let post of state.posts)
 {
   //chercher l'index du post dans le tableau puis les suprimer 
   if(post.id == postId) {
    index = state.posts.indexOf(post); 
    state.posts.splice(index,1);
    break }

 }

},
//supression du commentaire 
UNSET_POST_COMMENT: (state, commentId) => {
  let indexPost,indexComment ;
   for(let post of state.posts)
   {
    for(let comment of post.comments) {
      if(comment.id == commentId) {
        indexPost = state.posts.indexOf(post); 
        indexComment = state.posts[indexPost].comments.indexOf(comment); 
        state.posts[indexPost].comments.splice(indexComment,1);
      }
    }
  
   }

  },
//envoie du nouveau commentaire 
SET_NEW_POST_COMMENT: (state, newComment) => {
 console.log(newComment.comment)
let index ;
 for(let post of state.posts)
 {
   if(post.id == newComment.postId ) {
    index = state.posts.indexOf(post); 
    console.log("index1",index)
    state.posts[index].comments.unshift(newComment.comment);
    break }

 }

},
//mis à jour du commentaire 
SET_UPDATE_POST_COMMENT:(state,newUpdateCmnt) =>{

  let indexPost = state.posts.findIndex(post=> post.id == newUpdateCmnt.PostId);
  let indexCmnt = state.posts[indexPost].comments.findIndex(comments => comments.id == newUpdateCmnt.id);
  state.posts[indexPost].comments.splice(indexCmnt,1);
  state.posts[indexPost].comments.unshift(newUpdateCmnt);
 
},
//Ajouter like 
SET_POST_LIKE:(state ,likeObj)=>{
  
let indexPost = state.posts.findIndex(post=> post.id == likeObj.postId);

let indexLike = state.posts[indexPost].Likes.findIndex(like=> like.UserId == likeObj.userId)
//si la valeur différent à -1 donc l'utilisateur à déja liker on retire le like si nn on ajout le like au debut de tableau  
if(indexLike!=-1)
{ 
  state.posts[indexPost].Likes.splice(indexLike,1)
}
else { 
state.posts[indexPost].Likes.unshift({UserId : likeObj.userId});
}

},
//ajout dislike
SET_POST_DISLIKE:(state ,disLikeObj)=>{
  let indexPost = state.posts.findIndex(post=> post.id == disLikeObj.postId);
  let indexDislike = state.posts[indexPost].Dislikes.findIndex(dislike=> dislike.UserId == disLikeObj.userId)

  if(indexDislike!=-1)
    { 
      state.posts[indexPost].Dislikes.splice(indexDislike,1)
    }
    else { 
      state.posts[indexPost].Dislikes.unshift({UserId : disLikeObj.userId});
    }
},

 POSTS_REQUEST: state => {
    state.status = "loading";
  },
 POSTS_SUCCESS: (state) => {
    state.status = "success";
  },
 POSTS_SAVE: (state, resp) => {
   state.posts = resp;
  },
 POSTS_ERROR: state => {
    state.status = "error";
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
