import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './API/API'


  
    // Auto Auth

        const token = localStorage.getItem("user-token");
        if (token) {
       
          Api.defaults.headers.common['Authorization'] = 'Bearer '+token;
        }
     

    Api.interceptors.response.use(
      undefined ,
      error => {
          if (error.response.status) {
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
            return Promise.reject(error);
          }
        }
    );

createApp(App).use(store).use(router).mount('#app')

