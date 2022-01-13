<template>
                <!-- Déclecher l'evenement @submit au moment du clique sur le button 'commenter' -->
                   <form @submit.prevent="validationComment" novalidate class="needs-validation">
                        <div class="input-group"> 
                          
                            <input v-model="commentTxt" class="form-control" id="comment" placeholder="Ajouter un commentaire" type="text" >
                            <span class="input-group-addon">
                                <button type="submit"   class="btn btn-dark">Commenter</button>  
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


   data : () => ({
       //Initialisation des variable commentTxt et error a une valeur vide
        commentTxt : '',
        error : ''
       }),


         // props contenant un objet postid 
         props: {
            postid : {
                        type: Number,
                        required: true
                    },
                        
        },
        methods : {
        
         resetError() {
            this.error = false
        } ,
        //Vérifie si le commentair et vide affichage d'un message d'erreur , sinn ajouter le commentair
        validationComment() {
         if(!this.commentTxt){
          this.error = true ;
           window.setTimeout( this.resetError, 3000);
          
        }else{
            this.addComment()
        }
        },
       //Methods pour ajouter le commentair
        addComment() {
             //appele l'action 'ADD_COMMENT'
               this.$store.dispatch('ADD_COMMENT', { postId : this.postid, commentmessage : this.commentTxt} )
               //aprés l'ajout du commentair l'initialisation de la variable 'commentTxt' a une valeur vide
                .then((res)=> { console.log(res);this.commentTxt="";})
                .catch((error) => {console.log(error) });
        },
        //Verification la validation de l'input de commentair , si il est valider on ajout le commentair
       /* ValidationForm()
            { console.log("enter")
            var form = document.querySelector('.needs-validation')
                 form.classList.add('was-validated')
                if (form.checkValidity()) {
                this.addComment() 
                }

        }*/
        }

}


</script>

<style scoped lang="scss">  

</style>