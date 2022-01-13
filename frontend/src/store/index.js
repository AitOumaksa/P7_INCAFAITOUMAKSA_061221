import { createStore } from 'vuex'
import user from "./modules/user";
import auth from "./modules/auth";
import posts from "./modules/posts";
import comments from "./modules/comments";
import LikeDis from "./modules/likeDis";
 

export default createStore({

  modules: {
    user,
    auth,
    posts,
    comments,
    LikeDis

  },

})

