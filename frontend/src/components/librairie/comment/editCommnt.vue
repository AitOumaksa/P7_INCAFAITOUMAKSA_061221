<template>
              <!-- Déclecher l'evenement @submit au moment du clique sur le button 'l'icone d'actualisation' -->
                   <form @submit.prevent="validationComment" novalidate class="needs-validation">
                        <div class="input-group"> 
                          <!-- L'affichage de message actual  -->
                            <input v-model="editComment.message" class="form-control" id="comment" placeholder="Ajouter un commentaire" type="text" >
                            <span class="input-group-addon">
                                <button type="submit"   class="btn btn-dark"><i class="fas fa-redo"></i></button> 
                                <!-- L'Licone pour annuler l'actualisation   --> 
                                <button @click.prevent="this.$emit('close',true)" class="btn btn-dark"><i class="fas fa-window-close"></i></button> 
                            </span>
                        </div>
                        <!-- Affichage de message d'erreur si le commentair et vide  -->
                        <div v-if="error" class="alert alert-danger" role="alert">
                              Votre comentaire est vide
                        </div> 
                     </form>
</template>

<script>


export default {
// props contenant un objet postComnt
props: {
postComment : {
 type:  Object,
 required: true
},

},

data  ()  {
    return {
    error : '',
    // objet editComnt
     editComment : {
            PostId: this.postComment.PostId,
            UserId: this.postComment.UserId,
            id: this.postComment.id,
            message: this.postComment.message,
         
         }
    }
},

 methods : {

     resetError() { 
     this.error = false
    },
    //Vérifie si le commentair et vide affichage d'un message d'erreur , sinn on mis à jour le commentair
    validationComment() {
         if(!this.editComment.message){
          this.error = true ;
           window.setTimeout( this.resetError, 3000);
          
        }else{
            this.UpdateCmnt()
        }
    },
    //Methods pour mis à jour le commentair
     UpdateCmnt() {
    //appele l'action 'UPDATE_COMMENT'
    this.$store.dispatch('UPDATE_COMMENT',  this.editComment  )
    .then((res)=> { 
    console.log(res);
  
    this.$emit('close',true);
    })
    .catch((error) => {
        console.log(error)
         });
    },
}
}
</script>
<style scoped lang="scss">

</style>