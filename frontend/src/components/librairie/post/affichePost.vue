<template>
 
                <div class="panel post " >
                    <!-- fenêtre modoal Pour l'edition du post  -->          
                     <!-- La fenêtre modal ne s'affiche qu'au moment du clique sur l'icone edition   -->         
                    <Modal v-if="showModal" @close="showModal = false" >
                        <!-- Utilisation de v-slot pour l'emplacement du contenu Html  -->
                            <template v-slot:title>
                               Modifier la publication
                            </template>
                            <template v-slot:header>
                              <div></div>
                            </template>

                            <template  v-slot:body>
                            <!-- utilisation du composant editPost -->
                            <!-- aprés l'edition du post on émet un evenement  personalisé appellé close qui passe la valeur de showModal à false ce qui entraine la fermeture de la fenêtre -->
                                <editpost  @close="showModal = false" :postedit = post   /> 
                                
                            </template>
                        
                   </Modal>
                     
                    
                     
                    <!-- headers du post  -->
                    <div class="post-heading">
                        <!-- L'icone pour la supression du post ( en apppellant la methode 'deletePost') -->
                         <i v-if="userProfile.id ===post.User.id || userProfile.isAdmin " @click="deletePost(post.id)" class="fas fa-trash-alt float-end btn btn-light btn-sm ms-2"></i>
                        <!-- L'icone pour l'edition  du post ( faisant apparaitre le fenêtre modale en mettant 'showModal à true') -->
                          <i v-if="userProfile.id ===post.User.id"   @click="showModal = true" class="fas fa-edit float-end btn btn-light btn-sm"></i>
                        <div class="float-start image">
                            <!-- L'affichage de l'image utilisateur  dans le post si elle exist, si nn l'affichage de l'image par defaut  -->
                            <img v-if="post.User.profile_picture" :src="post.User.profile_picture" class="img-circle avatar" alt="user profile image">
                            <img v-if="!post.User.profile_picture" src="@/assets/images.png" class="img-circle avatar" alt="user profile image">
                        </div>
                        <div class="float-start meta">
                             <div class="title h6">
                                 <!-- L'affichage des infos utilisateur dans le post son' nom ,prénom' -->
                               <span class="name"> {{post.User.lastName}} {{post.User.firstName}} </span>
                                <span v-if="post.imageUrl"> A ajouté une photo</span>
                            </div>
                            <!-- L'affichage du temps de publication ou de mise à jour du post (formaté) -->
                            <h6 class="time">{{ dateFromNow }}</h6>
                        </div>
                    </div>
                    <div class="post-image">
                        <!-- L'affichage de l'image du post si elle existe en associant post.imgeUrl avec l'attibut :src -->
                         <img v-if="post.imageUrl" :src="post.imageUrl" class="image" alt="image post">
                    </div>
                    <div class="post-description">
                        <!-- On affiche 'Description' si imageUrl et le message existent -->
                        <h4 v-if="post.imageUrl && post.message">Description</h4>
                        <!--  affichage post.message si il existe-->
                        <p v-if="post.message">{{post.message}}</p>
                        <div class="stats">
                            <!--En cas de clique envoie du like avec la methode sendLike() en passant comme argument (Post.id , userProfile.id) et disabled le boutton 'dislike'-->
                            <a class="btn btn-outline-dark stat-item" @click="sendLike({postId:post.id,userId:userProfile.id})" :class="checkUserLikeClassBtn">
                                <!--  utlise un computed 'totalLike' pour calculer dynamiquement le total de likes et un computed 'checkUserLikeClassIcon' pour changer dynamiquement l'icone du like -->
                                <i class="icon" :class="checkUserLikeClassIcon"></i>{{totalLike}}
                            </a>
                            <!--En cas de clique envoie du dislike avec la methode sendDislike() en passant comme argument (Post.id , userProfile.id) et disabled le boutton 'like'-->
                            <a  class="btn   btn-outline-dark stat-item" @click="sendDisLike({postId:post.id,userId:userProfile.id})" :class="checkUserDislikeClassBtn">
                                <!--  utlise un computed 'totalDislike' pour calculer dynamiquement le total de dislikes et un computed 'checkUserDislikeClassIcon' pour changer dynamiquement l'icone du like -->
                                <i class="icon" :class="checkUserDislikeClassIcon"></i>{{totalDislike}}
                            </a>
                        </div>
                    </div>
                    <div class="post-footer">
                        <!-- utilisation du composant ajoutComment (../comment/ajoutComment.vue) -->
                        <ajoutcomment :postid = post.id /> 
                        <ul class="comments-list">
                            <!-- L'utilisation de le boucle for pour parcourir le tableau des commentaires du post-->
                            <li  v-for="comment in commentLoaded " :key="comment.id" class="comment">
                                <!-- Afficher les commentaires avec le composant affichComment (../comment/afficheComment.vue)  -->
                                <affichecomment :postcomment = comment  /> 
                            </li>
                        </ul>
                        <!-- traite le button afficher plus et afficher moins  -->
                        <button class="btn btn-dark btn-sm" v-if="commentLoaded.length< post.comments.length" @click="loadMore">Afficher plus</button>
                        <button class="btn btn-dark btn-sm" v-if="commentLoaded.length > minCommentShow" @click="loadLess">Afficher Moins</button>
                    </div>
                </div>
     
</template>

<script>
import affichecomment from "../comment/afficheComment.vue";
import ajoutcomment from "../comment/ajoutComment.vue";
import editpost from "./editPost.vue";
import Modal from "../Modal/Modal.vue";
import moment from 'moment' 
import { mapState } from "vuex";
export default {

      
   data : () => ({
       //Initialisation de la variable showModal a false
         showModal: false,
         //Min des commentaire à afficher 
         minCommentShow : 2,
         // le nombre des  commentaire à afficher 
         NumberOfCommentShow: 2,
       }),

       components : {
                affichecomment,
                ajoutcomment,
                editpost,
                Modal,

       },
        // props contenant un objet post
         props: {
            post : {
                        type: Object,
                        required: true
                    },
            
                        
        },
        methods : {
            //Methode de supression du post on donne comme argument Postid 
            deletePost(postId) {
              //appeler l'action 'DELETE_POST' 
               this.$store.dispatch('DELETE_POST', postId )
                .then((res)=> { console.log(res)})
                .catch((error) => {console.log(error) });
            }, 
            //Methode pour envoyer Les likes 
             sendLike(like) {
              //appeler l'action 'SEND_LIKE' 
               this.$store.dispatch('SEND_LIKE', like )
                .then((res)=> { console.log(res)})
                .catch((error) => {console.log(error) });
            },
            //MMethode pour envoyer Les dislikes
             sendDisLike(dislike) {
              //Appeler L'action 'SEND_DISLIKE' 
               this.$store.dispatch('SEND_DISLIKE', dislike )
                .then((res)=> { console.log(res)})
                .catch((error) => {console.log(error) });
            }, 
            //Methode traite 'afficher plus' des commentaires 
            loadMore() {
                //verifie si la taille si les commentaires chargées sont inférieur  à la taille des commentaire 
                if (this.commentLoaded.length < this.post.comments.length) 
                    {   
                          // il calcule la somme de NombreOfCommentShow  +=   minCommentShow 
                          this.NumberOfCommentShow += this.minCommentShow;
                    }
            
                },
           //Methode traite 'afficher moins' des commentair
            loadLess() {
                 //verifie si la taille si les commentaires chargée sont inférieur ou égale à minCommentShow  
                if (this.commentLoaded.length   > this.minCommentShow)
                { 
                 //calcule la soustraction de NombreOfCommentShow  -=   minCommentShow
                   this.NumberOfCommentShow -= this.minCommentShow;

                }
                
                },
           
        },
        //permet d'obsérver les modification effectuée à la variable 'showModal', (pour eviter d'afficher douuble ascenseur)
        watch : {

                showModal : function () {
                //Si showModal est à true la propriété css overflow de body passe = hidden      
                    if(this.showModal) {
                      
                        document.body.style.overflow = 'hidden';
                    }
                    //Si showModal est à false la propriété css overflow de body passe à la valeur par défaut 
                    else {
                       document.body.style.overflow = '';
                    }
                }
            },
   
         computed: {
             //Calcule le total de like du post 
            totalLike() {
            return this.post.Likes.length
            },
            //Calcule de total du dislike
            totalDislike() {
            return this.post.Dislikes.length
            },
            //vérifier si l'utilisateur exist dans le tableau de Like du post et return la class de l'icone à afficher  
            checkUserLikeClassIcon () {
                    return this.post.Likes.find(like => like.UserId == this.userProfile.id) ? "fa fa-thumbs-up" : "far fa-thumbs-up" ; 
            },
             //vérifier si l'utilisateur exist dans le tableau de Dislike du post et return la class de l'icone à afficher
            checkUserDislikeClassIcon () {
                  return   this.post.Dislikes.find(dislike => dislike.UserId == this.userProfile.id) ? "fa fa-thumbs-down" : "far fa-thumbs-down" ;    
            },
            //vérifier si l'utilisateur exist dans le tableau de dislike  return disabled
            checkUserLikeClassBtn () {
                    return this.post.Dislikes.find(dislike => dislike.UserId  == this.userProfile.id) ? "disabled" : "" ; 
            },
            //vérifier si l'utilisateur exist dans le tableau de like  return disabled
            checkUserDislikeClassBtn () {
                  return   this.post.Likes.find(like => like.UserId == this.userProfile.id) ? "disabled" : "" ;    
            },
            //Methodes pour formater le temps  de creation ou mise a jour des posts
           dateFromNow() 
                        {   
                            moment.locale('fr');
                           if(this.post.updatedAt != this.post.createdAt ) return `Mise à jour ${moment(this.post.updatedAt).fromNow()}`
                           else return  moment(this.post.createdAt).fromNow ()
                        },
            //Récuperer une portion du tableau commentaire de 0 à NombreOfShowComment-1           
           commentLoaded() {
                return this.post.comments.slice(0, this.NumberOfCommentShow);
                },
                //Recuperer du state(module user) le profile du user et le stoque dans userProfile
             ...mapState({
              
                  userProfile : state => state.user.profile
                })
        
           
        },

}


</script>

<style scoped lang="scss">

    /* Component: Panel */
    .panel {
      border-radius: 0;
      margin-bottom: 30px;
    }
   

    
    /* Component: Posts */

    .post-heading {
      height: 95px;
      padding: 20px 15px;
       .avatar {
                width: 60px;
                height: 60px;
                display: block;
                margin-right: 15px;
                }
        .meta {
            .title {
                margin-bottom: 0;
                      .name  {
                        font-weight : bold;
                    }
                }
            
        }
    }
  
    .post-image .image  {
      width: 100%;
      height: auto;
      display: block;
      max-height : 500px;
    }

    .post-description {
      padding: 15px;
      p {
        font-size: 14px;
        }
    .stats {
      margin-top: 20px;
        .stat-item {
                    display: inline-block;
                    margin-right: 15px;
                    .icon {
                            margin-right: 8px;
                            }
                    }
    }
    }

    .post-footer {
      border-top: 1px solid rgb(0, 0, 0);
      padding: 15px;
  
    .comments-list {
                        padding: 0;
                        margin-top: 20px;
                        list-style-type: none;
                        .comment {
                                    display: block;
                                    width: 100%;
                                    margin: 20px 0;
                                    }
                    }
       
    }
  
  
  
  

</style>