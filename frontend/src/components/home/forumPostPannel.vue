<template>
<div class="container forum">
   
<div class="row">
    <div class="col-md-8 offset-md-2">
      <!-- L'avatar de la page d'accueil -->
        <div class="panel panel-white profile-widget">
            <div class="row">
                <div class="col-md-12">
                  <!-- L'importation de composant avatar (../librairie/avatar/avatar.vue)-->
                   <avatar/> 
                </div>
                <div class="col-md-12">
                    <div class="details">
                        <h4>{{User.firstName}} {{User.lastName}}</h4>
                        <div>{{User.bio}}</div>
                    </div>
                </div>
                 
            </div>
        </div>
          <!--  Panneau pour ajouter des post   --> 
         <div class="row">
            <div class="col-md-12 pull-left posttimeline">
              <!-- importation  de composant ajoutPost (../librairie/post/ajoutPost.vue)-->
                      <ajoutPost  /> 
                    
                    <!-- Chargement du post --> 
            </div>
       </div>
       <!--l'affichage de l'ensemble des posts des utilisateurs-->
        <div v-if ="allPost" class="row">  
          <!-- L'utilisatuin de boucle for pour parcourire le tableau des posts utilisateurs  -->
            <div  v-for="post in allPost" :key="post.id" class="col-md-12">
              <!-- L'importation de composant affichePost (../librairie/post/affichePost.vue)-->
              <affichePost :post = post /> 
              
            </div>
      </div>
    </div>

</div>
</div>
</template>

<script>
import { mapState } from "vuex";
import avatar from "../librairie/avatar/avatar.vue";
import affichePost from "../librairie/post/affichePost.vue";
import ajoutPost from "../librairie/post/ajoutPost.vue";
export default {


       created: function() {
                //récupère toutes les publications et les sauvegardes dans le state (module posts tableau posts)
              
                this.$store.dispatch('GET_ALL_POST');
            
               

            },
     components: {
          
            avatar,
            affichePost,
            ajoutPost,
           
         
        },
   //récupère le profile de l'utilisateur et tous les publications sauvegardé dans le state
  computed: mapState({ User : state => state.user.profile ,  allPost : state => state.posts.posts}),
          



}


</script>

<style scoped>
.container.forum{margin-top:20px;
    
    }
  /* post pannel */
 .posttimeline .panel {
	margin-bottom: 15px
}


.panel {
    margin-bottom: 35px;
    border-radius: 0px;
    position: relative;
    border: 0;
    display: inline-block;
    width: 100%;
}

.status-upload {
	width: 100%;
	float: left;
	margin-bottom: 15px
}

 .panel {
      border-radius: 0;
      margin-bottom: 30px;
    }
	
.panel .panel-body {
      font-size: 13px;
    }
	
  .panel .panel-body > .body-section {
      margin: 0px 0px 20px;
    }
    .panel .panel-body > .body-section > .section-heading {
      margin: 0px 0px 5px;
      font-weight: bold;
    }
    .panel .panel-body > .body-section > .section-content {
      margin: 0px 0px 10px;
    }
 .panel-body .post-image {
      width: 100%;
      height: auto;
      display: block;
    }

    .profile-widget .details {
    padding: 50px 15px 15px;
    text-align: center;
}
</style>