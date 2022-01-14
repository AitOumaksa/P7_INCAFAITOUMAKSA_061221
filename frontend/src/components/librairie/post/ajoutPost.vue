<template>

            
              <div class="panel">
                <div class="panel-body">
                    <div class="status-upload nopaddingbtm">
                        <!-- Déclecher l'evenement @submit au moment du clique sur le button 'partager' -->
                    <form  @submit.prevent="validationPost">
                        <img class="post-image" :src="post.srcImage"><i @click.prevent="deleteImgAdd" v-if="post.srcImage" class="fas icon_position fa-times fa-2x btn btn-dark btn-sm me-2 mt-2"></i>
                        <textarea class="form-control" v-model="post.message" placeholder="Que faite vous aujourd'hui ?"></textarea>
                        <!-- Affichage de message d'erreur si la publication et vide  -->
                            <div v-if="post.error" class="alert alert-danger" role="alert">
                              Votre publication et vide
                            </div> 
                        <br>
                        
                        <input type="file" accept=".jpg, .jpeg, .png"  ref="fileInput"  hidden @change="handleImageChange">
                        <ul class="nav nav-pills float-start">
                            <li><i class="fas fa-camera btn btn-dark btn-sm float-start ms-2"  @click="editImage" ></i></li>
                        </ul>
                      
                          <button type="submit" class="btn btn-dark float-end me-2"> partager </button>
                        
                    </form>
                    </div>
                </div>
              </div>
    
</template>

<script>

export default {

       data : () => ({
           //Création d'un objet post 
           post : {
               message : '',
               link:'',
              srcImage:'',
              image : '',
              error : ''
           },
          
           
     }),
         
  methods: {
        //
         resetError() {
            this.post.error = false
        } ,
        //vérifie si la publication et vide affichage d'un message d"erreur , sinn l'envoie du post 
        validationPost() {
         if(!this.post.message && !this.post.srcImage){
          this.post.error = true ;
           window.setTimeout( this.resetError, 3000);
          
        }else{
            this.sendPost()
        }
        },
        //permet d'afficher l'image la balise img et de l'enregistrer dans post.image
        handleImageChange(event) {
        //sauvegarder l'image selectionnée dans (this.post.image)
         this.post.image = event.target.files[0];
         //  créer une Url avec la function 'creatObjetUrl en passsant comme argument 'L'image sauvegardé'
         this.post.srcImage = URL.createObjectURL(this.post.image);
    
        },
        // permet de cliquer sur l'input type file lorsqu'on click sur l'icone 'apareil photo'
        editImage(event) {
            const imageInput = event.target.closest('form').querySelector('input');
            imageInput.click();
             
        },

        // permet de créer le formdata du post et de l'envoyer au backend
        sendPost() {
            //créer une instance FromData  pour l'envoi des donées de formulaire 
                    const formData = new FormData();
                    //L'ajout des Champs en apellant la méthode (append) 
                    if(this.post.image)
                     {
                     
                     formData.append('image', this.post.image, this.post.image.name);
                    
                     }

                      formData.append('message', this.post.message);
                     formData.append('link', this.post.link);
                     
                    // Appel l'action (SEND_POST) pour envoyer les données de formulaire au backend 
                     this.$store.dispatch('SEND_POST',  formData)
                     .then(()=> {this.deletePostData();
                                      
                                  })
                     .catch((error) => {this.deletePostData();console.log(error)});
            },

        // Permet de réinitialiser les données de post et de ne plus les afficher dans la page html
        deletePostData() {           
                this.post.message = '';
               this.post.link = '';
              this.post.srcImage = '';
              this.post.image = '';
              this.post.error = ''
             this.$refs.fileInput.value='';
        },
         // Permet de supprimer l'image (Annuler l'ajout d'image ) au moment de l'ajout du post 
         deleteImgAdd() {
            this.post.srcImage = ""; 
            this.post.image ="";
            this.$refs.fileInput.value='';
             
        },
    },

}


</script>

<style scoped>

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
	

 .panel-body .post-image {
      width: 100%;
      height: auto;
      display: block;
       max-height : 500px;
    }
.icon_position{
    position: absolute;
    top: 0 ;
    right: 0;
    
}

</style>