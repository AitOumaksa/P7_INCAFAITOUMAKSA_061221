<template>
<navigation />

 <router-view> </router-view>
    
</template>

<script>
import Navigation from "./components/librairie/navigation";





export default {
  components: {
    Navigation
  },
  name: "app",
  
  created: function() {
    // Récupère le profile du user et l'nrregistre dans le store
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch('USER_REQUEST')
       .catch((error) => {
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
