<template>
<!-- Définir un background pour avatar 'static' -->
  <div class="image-container"  :style="{ backgroundImage : 'url(' + require('@/assets/icon-above-font.png') + ')' }"> 
  <!-- Afficher la profile_picture s'il exist --> 
      <img class="avatar mx-auto d-block" v-if="User.profile_picture" alt="avatar" :src="User.profile_picture">
      <!-- Afficher  img par defaut si profile_picture n'exist pas -->
        <img class="avatar mx-auto d-block"  v-if="!User.profile_picture" alt="avatar" src="@/assets/images.png">
      <div v-if="uploadPhotoError" class="alert alert-danger" role="alert">
          {{uploadPhotoErro}}
      </div>
      <!--Déclencher l'évenement @change si l'utilisateur ajoute l'img 1er fois  -->
      <input type="file" accept=".jpg, .jpeg, .png" id="imageInput" hidden @change="handleImageChange">
       <!--Déclencher l'évenement @change si l'utilisateur edit L'image -->
      <i class="fas fa-camera icon_modif btn btn-danger btn-sm" id="pick-avatar"   @click="editImage" ></i>
      <!-- afficher l'icone de supresion de profile_picture si exist si nn l'icone sera cacher -->
      <i class="fas fa-trash-alt icon_sup btn btn-dark btn-sm" id="pick-avatar" v-if="User.profile_picture" @click="deleteProfilePic" ></i>     
  </div>
  
</template>

<script>
import { mapState } from "vuex";
 
export default {

       data : () => ({
      //Initialisation de variable uploadPhotoError a une valeur vide
       uploadPhotoError : "",
       
       }),
         
        
        methods: {
        //permet d'afficher l'image dans la balise img et de l'enregistrer dans User.profile_picture
        handleImageChange(event) {
          //sauvegarder l'image selectionnée 
            const image = event.target.files[0];
            //créer une instance FromData  pour l'envoi des donées de formulaire 
            const formData = new FormData();
            //L'ajout des Champs en apellant la méthode (append), en passant comme argument Limage sevgarder dans la const image
            formData.append('image', image, image.name);
            //Appele l'action 'UPLOAD_IMAGE' , envoyer les doonnées de formulaire au backend 
            this.$store.dispatch('UPLOAD_IMAGE', formData)
            //on recois le message d'erreur dans le catch et puis l'afficher 
            .catch(() => this.uploadPhotoError="photo du profil non mofifiée");
        },
        // permet de cliquer sur l'input type file lorsqu'on click sur l'icone 'apareil photo'
        editImage() {
            const imageInput = document.getElementById('imageInput');
            imageInput.click();
        },
        //Methodes pour supression de User.profile_picture
        deleteProfilePic(){
          //appele l'action 'DELETE_IMAGE'
         this.$store.dispatch('DELETE_IMAGE')
        }
    },
  //Recuperer du state(module user) le profile du user et le stoque dans User
  computed: mapState({ User : state => state.user.profile }),

}

</script>

<style scoped>

  .image-container {
      background-size: cover;
      background-position: center;
      position: relative;
     
                       
    }

     .image-container   .icon_modif{
      position: absolute;
     visibility: visible;
      bottom: 30px;
      left: 50%;
 
   
    }
    .icon_sup{
      position: absolute;
     visibility: visible;
      bottom: 30px;
      right: 50%;
    }
    .image-container .avatar {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      
      
     
    }
</style>
