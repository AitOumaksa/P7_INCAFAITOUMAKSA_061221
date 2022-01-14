import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './API/API'


  
    // Auto Auth
      //avant la monter de l'application chercher dans localStorge le token qui prend comme clé 'user-token'
        const token = localStorage.getItem("user-token");
        if (token) {
        //ajouter le token dans l'entet des requete envoyer 
          Api.defaults.headers.common['Authorization'] = 'Bearer '+token;
        }
     
    //itercepter tt les repenses de l'api 
    Api.interceptors.response.use(
      //définir undefined pour ne pas itercepter les repenses de succées 
      undefined ,
       //itercepter les repenses d'error 
      error => {
        
          if (error.response.status) {
            //vérifie si le status dans la switch = 401 on execute la switch  
            switch (error.response.status) {
             
            
              case 401:
                alert("la session a expirée veuillez vous reconnecter");
                 store.dispatch('AUTH_LOGOUT')
                 router.replace({
                 path: "/login",
                query: { redirect: router.currentRoute.fullPath }
                });
                break;
            
            }
            //si nn on return les message error 
            return Promise.reject(error);
          }
        }
    );

createApp(App).use(store).use(router).mount('#app')

