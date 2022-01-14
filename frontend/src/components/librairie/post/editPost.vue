<template>


              <div class="panel">
                <div class="panel-body">
                    <div class="status-upload nopaddingbtm">
                    <!-- Déclecher l'evenement @submit au moment du clique sur le button 'partager' -->
                    <form  @submit.prevent="validationPost">
                        <img class="post-image"  :src="post.srcImage"><i @click="deleteImgEdit"  v-if="post.srcImage" class="fas icon_position fa-times fa-2x btn btn-dark btn-sm me-2 mt-2"></i>
                        <textarea class="form-control" v-model="post.message" placeholder="Que faite vous aujourd'hui ?">  </textarea>
                        <!-- Affichage de message d'erreur si la publication et vide  -->
                        <div v-if="post.error" class="alert alert-danger" role="alert">
                              Votre publication et vide
                        </div>
                        <br>
                        
                        <input type="file" accept=".jpg, .jpeg, .png"   ref="fileInput" hidden  @change="handleImageChange">
                        <ul class="nav nav-pills float-start">
                            <li><i class="fas fa-camera btn btn-dark ms-2 btn-sm float-start"  @click="editImage" ></i></li>
                        </ul>
                      
                          <button type="submit" class="btn btn-dark me-2 float-end">  partager </button>
                        
                    </form>
                    </div>
                </div>
              </div>
    
</template>

<script>

export default {
//utiliser un props qui contient un objet post à modifier
   props: {
            
              postedit : {
                        type: Object,
                        required: true
                    },
            
        },

       
           data() {
                    return {
                    //return un objet post 
                       post : {
                                message : this.postedit.message ,
                                link:this.postedit.link,
                                srcImage:this.postedit.imageUrl ,
                                image : '',
                                //cette variable permet d'indiquer au backend que l'image du post a été supprimé
                                deleteImage : false,
                                error : ''
                            },
                     }
           },     
    methods: {
     resetError() {
            this.post.error = false
        } ,
        //Méthode qui verifie si le post n'est pas vide et appel la methode updatePost si non il affiche un message d'erreur  indiquant le  post est vide pendant 3 secondes
        validationPost() {
         if(!this.post.message && !this.post.srcImage){
          this.post.error = true ;
           window.setTimeout( this.resetError, 3000);
        }else{
            this.updatePost()
        }
        },
        //permet d'afficher l'image dans la balise img et de l'enregistrer dans post.image
        handleImageChange(event) {
         this.post.image = event.target.files[0];
         this.post.srcImage = URL.createObjectURL(this.post.image);
       
        },
        // permet de cliquer sur l'input type file lorsqu'on click sur l'icone 'appareil photo'
        editImage() {
            const imageInput = event.target.closest('form').querySelector('input');
            imageInput.click();
             
        },
        // permet de créer le formdata du post et de l'envoyer au backend
        updatePost() {
                    const formData = new FormData();
                    if(this.post.image)
                     {
                     
                     formData.append('image', this.post.image, this.post.image.name);
                    
                     }

                      formData.append('message', this.post.message);
                     formData.append('link', this.post.link);
                      formData.append('deleteImage', this.post.deleteImage);
                     
                    //appeler l'action 'UPDATE_POST' 
                     this.$store.dispatch('UPDATE_POST',  {post : formData, id : this.postedit.id })
                     .then((res)=> {this.deletePostData();console.log(res);
                     // aprés L'update du post en emmet un evenement personnalisé appellé close (qui sert à fermer la fenêtre modale)
                                    this.$emit('close',true);
                                  })
                     .catch((error) => {this.deletePostData();
                    
                     console.log(error)
                     });
            },
        // Permet de réinitialiser les données du post et de ne plus les afficher dans la page html    
        deletePostData() {
              this.post.message = '';
               this.post.link = '';
              this.post.srcImage = '';
              this.post.image = '';
              this.post.error = ''
             this.$refs.fileInput.value='';
             
        },
        // Permet de supprimer l'image pendant la modification du post 
        deleteImgEdit() {
            this.post.srcImage = ""; 
            this.post.image = '';
            this.post.deleteImage= true;
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
      position: relative;
       max-height : 500px;
    }
.icon_position{
    position: absolute;
    top: 0 ;
    right: 0;
    
}

</style>