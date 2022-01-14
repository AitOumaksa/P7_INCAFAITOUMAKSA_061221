<template>
<!--L'utilisation de composant navigation (./components/librairie/navigation) -->
<navigation />
<!--- L'utilisation de retour-view pour les différent route définie -->
 <router-view> </router-view>
    
</template>

<script>
import Navigation from "./components/librairie/navigation";





export default {
  components: {
    Navigation
  },
  name: "app",
  //au moment de la creation de l'app 
  created: function() {
    // Récupère le profile du user et l'enregistre dans le store
    if (this.$store.getters.isAuthenticated) {
      //appele l'action 'USER_REQUES' 
      this.$store.dispatch('USER_REQUEST')
       .catch((error) => {
         //en cas d"échec de récuperation de profile dériger l'utilisateur vers la page /login 
             this.$router.push({ name: 'Login'});
             console.log(error)
               
            })
      
    }

 
 
  }
  
};
</script>

<style>
 .panel {
  box-shadow:0px 2px 10px 0 rgb(0 0 0 / 46%);
   background-color : rgb(243, 226, 226)!important;
  
 } 
</style>
