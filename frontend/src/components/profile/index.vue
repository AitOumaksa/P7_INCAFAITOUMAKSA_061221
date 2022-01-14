<template>

<div class="container profile">
<!-- fenêtre modoal edit profile -->             
                    <Modal v-if="showModal" @close="showModal = false" >
                            <template v-slot:title>
                               Modifier le profile
                            </template>
                       

                            <template  v-slot:body>
                             <!-- Utilisation du composant edit dans le body de la fenétre modal -->
                                 <editProfile  @close="showModal = false"/>
                                
                          
                          
                            </template> 
                   </Modal>
<!-- end fenêtre modoal edith profile -->
<!-- Contenu de la page profile-->
<div class="row">
    <div class="col-md-8 offset-md-2">
        <div class="panel profile-widget">
            <div class="row">
                <div class="col-md-12">
                  <!-- Utilisation du composant avatar -->
                     <avatar/>
                </div>
                <div class="col-md-12">
                    <div class="details">
                       <!--  Affichage des infos utilisateurs nom,prénom et bio  -->
                        <h4>{{User.firstName}} {{User.lastName}}<i class="fa fa-sheild"></i></h4>
                        <div>{{User.bio}}</div>
                        <div class="mg-top-10 btn btn-dark" type="button"  @click="showModal = true">
                             Modifier le profile
                       </div>
                    </div>
                </div>
                 
            </div>
        </div>

          <div v-if ="myPosts" class="row"> 
             <!-- L'utilisation de le boucle for pour parcourir le tableau des posts d'utilisateur myPosts-->
            <div  v-for="post in myPosts" :key="post.id" class="col-md-12">
              <!-- Afficher les posts utilisateurs  avec le composant AffichePost (../librairie/post/affichePost.vue)  -->
              <affichePost :post = post /> 
            </div>
         </div>
    </div>

</div>
</div>
</template>

<script>
import { mapState } from "vuex";
import editProfile from "./edit.vue";
import avatar from "../librairie/avatar/avatar.vue";
import affichePost from "../librairie/post/affichePost.vue";
import Modal from "../librairie/Modal/Modal.vue";
export default {

       data : () => ({
         ////Initialisation de la variable showModal a false
           showModal: false,
       
       }),
         components: {
            editProfile ,
            avatar,
            affichePost,
            Modal,
         
        },
        //permet d'obsérver les modification effectuée à la variable 'showModal', (pour eviter d'afficher douuble ascenseur)
         watch : {
                showModal : function () {
                  
                    if(this.showModal) {
                    //Si showModal est à true la propriété css overflow de body passe = hidden 
                        document.body.style.overflow = 'hidden';
                    }
                    //Si showModal est à false la propriété css overflow de body passe à la valeur par défaut
                    else {
                       document.body.style.overflow = 'auto';
                    }
                }
            },
          created: function() {
                // Récupère le profile du user et l'enregistre dans le store
                if (this.$store.getters.isAuthenticated) {
                  //appelle l'action 'GET_MY_POSTS' recupérer le post utilisateur 
                this.$store.dispatch('GET_MY_POSTS');
                }
               

            },
    //Recuperer du state(module user) le profile du user et le stoque dans userProfile ,  les posts utilisateur dans le state (module posts) et le stoque dans myPost
    computed: mapState({ User : state => state.user.profile ,  myPosts : state => state.posts.posts })

}


</script>

<style scoped>

  
/* fin fenêtre modal */
.container.profile{margin-top:20px;
    
    }
    
    .profile-widget {
      position: relative;
    }
  
    .profile-widget .details {
      padding: 15px 15px 15px;
      text-align: center;
    }
  

    /* Component: Panel */
    .panel {
      border-radius: 0;
      margin-bottom: 30px;
    }
   
   

</style>