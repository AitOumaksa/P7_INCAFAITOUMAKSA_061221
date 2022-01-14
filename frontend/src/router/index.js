import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";
//verification si l'utilisateur No authentifié
const ifNotAuthenticated = (to, from, next) => {
  //Si l'utilisateur n'est pas authentifié on fait  next et on l'autorise à passer a la route /Login ou /signup 
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
//Si nn accéder à la page home (L'utilisateur et authentifié )
  next("/");
};
//verification si l'utilisateur est authentifié
const ifAuthenticated = (to, from, next) => {
  //Si l'utilisateur est authentifié on fait  next et on l'autorise à passer a la route /form  ou /profile 
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
 //Si nn on le renvoie vers la route  /login (L'utilisateur n'est pas authentifié )
  next("/login");
};

const routes = [
  
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/home/forumPostPannel.vue'),
    //avant d'entrer vérifié si l'utilisateur est authentifié on l'autorise à accéder a la page Home
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/login'),
    //avant d'entrer vérifié si l'utilisateur n'est pas autorisé authentifié on l'autorise à accéder a la page login
    beforeEnter: ifNotAuthenticated 
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/signup'),
   //avant d'entrer vérifié si l'utilisateur n'est pas autorisé authentifié on l'autorise à accéder à la page signup
    beforeEnter: ifNotAuthenticated 
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/profile'),
    //avant d'entrer vérifié si l'utilisateur est authentifié on l'autorise à accéder a la page profile
    beforeEnter: ifAuthenticated
  },
  
  {
    path: '/forum',
    name: 'Forum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/home/forumPostPannel.vue'),
    //avant d'entrer vérifié si l'utilisateur est authentifié on l'autorise à accéder a la page forum
    beforeEnter: ifAuthenticated
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
