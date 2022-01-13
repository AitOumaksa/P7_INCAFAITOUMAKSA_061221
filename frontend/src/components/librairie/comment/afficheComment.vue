<template>
<div>
   <div v-show="!editComnt">
                                <!-- L'affichage de la photo de l'utilisateur si exist si nn affichage de l'image par defaut -->
                                <a class="float-start">
                                    <img class="avatar" v-if="postcomment.User.profile_picture" :src="postcomment.User.profile_picture" alt="avatar">
                                    <img class="avatar" v-if="!postcomment.User.profile_picture" src="@/assets/images.png" alt="avatar">
                                </a>
                                <div class="comment-body">
                                    <div class="comment-heading">
                                        <!-- L'icone pour la supression du commentair ( en apppellant la methode 'deleteComment' )  -->
                                        <i v-if="userProfile.id ===  postcomment.User.id || userProfile.isAdmin" @click="deleteComment( postcomment.id)" class="fas fa-trash-alt float-end btn btn-light btn-sm"></i>
                                        <!-- L'icone pour l'edition  du commentair ( faisant appa le chmaps 'editeComment') -->
                                        <i v-if="userProfile.id ===  postcomment.User.id" @click="editComnt = true" class="fas fa-edit float-end btn btn-light btn-sm"></i>
                                         <!-- L'affichage des infos utilisateur dans le commentair son' nom ,prénom' -->
                                        <h4 class="user">{{ postcomment.User.lastName}} {{ postcomment.User.firstName}}</h4>
                                         <!-- L'affichage du temps de publication  ou de mise à jour du commentair (formaté) -->
                                        <h5 class="time">{{ dateFromNow }}</h5>
                                    </div>
                                    <!--  affichage de postCommnt.message -->
                                    <p>{{ postcomment.message}}</p>
                                </div>
                                
    </div>  
     <!--  affichage du champs d'edition quand la valeur de la variable  editComment = true  -->
    <editComment @close="editComnt = false" v-if="editComnt" :postComment = postcomment   />  
</div>                  
</template>


<script>
import moment from 'moment' 
import { mapState } from "vuex";
import editComment from "./editCommnt.vue";
export default {


   data : () => ({
    //Initialisation de la variable editCommnt a false
       editComnt : false,

       
       }),
    components :  {

        editComment,
    },
    // props contenant un objet postComment
         props: {
            postcomment : {
                        type: Object,
                        required: true
                    },
           
                                
        },
        methods : {
        //Methods pour la supression du commentair
             deleteComment(commentId) {
              console.log(commentId)
              //appele l'action 'DELETE_COMMENT'
               this.$store.dispatch('DELETE_COMMENT', commentId )
                .then((res)=> { console.log(res)})
                .catch((error) => {console.log(error) });
             },
        
                
            },
    computed : {
        //Recuperer du state(module user) le profile du user et le stoque dans userProfile
          ...mapState({
              
                  userProfile : state => state.user.profile
                }),
         //Methodes pour formater le temps  de creation ou mise a jour des posts
        dateFromNow() 
                        {  
                            //Définir la langue 
                            moment.locale('fr');
                            //Calculer le temps entre la date de publication et la date en ce moment pour donner le total
                            if(this.postcomment.updatedAt != this.postcomment.createdAt ) return `Mise à jour ${moment(this.postcomment.updatedAt).fromNow()}`
                           else return  moment(this.postcomment.createdAt).fromNow ()
                        },
    }
           

}


</script>

<style scoped lang="scss"> 
                                    .avatar {
                                            width: 35px;
                                            height: 35px;
                                            }
                           
                                    .comment-body {
                                                    margin-left: 50px;
                                                    .comment-heading {
                                                        display: block;
                                                        width: 100%;
                                                        .user {
                                                                font-size: 14px;
                                                                font-weight: bold;
                                                                display: inline;
                                                                margin-top: 0;
                                                                margin-right: 10px;
                                                                }
                                                        .time {
                                                                font-size: 12px;
                                                                margin-top: 0;
                                                                display: inline;
                                                                }
                                                        }
                                                    }
</style>