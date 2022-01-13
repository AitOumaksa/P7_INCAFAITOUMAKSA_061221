<template>
        <div class="container">
            <div id="signup-row" class="row justify-content-center align-items-center">
                <div id="signup-column" class="col-md-6">
                    <div id="signup-box" class="col-md-12 panel">
                        <!-- Formulaire de la route signup -->
                        <form   @submit.prevent="ValidationForm()" id="signup-form" class="needs-validation" novalidate>
                            <h3 class="text-center">Inscription</h3>
                            <div class="form-group">
                                <label for="firstname" >Prénom:</label><br>
                                <input v-model="newUser.firstName" type="text" name="firstname" id="firstname" class="form-control" required pattern="^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$">
                                <div class="valid-feedback">Prénom valide</div>
                                <div class="invalid-feedback">Prénom invalide</div>
                            </div>
                             <div class="form-group">
                                <label for="lasttname" >Nom:</label><br>
                                <input v-model="newUser.lastName" type="text" name="lastname" id="lastname" class="form-control" required pattern="^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$">
                                 <div class="valid-feedback">Nom valide</div>
                                <div class="invalid-feedback">Nom invalide</div>
                            </div>
                            <div class="form-group">
                                <label for="email" >Email:</label><br>
                                <input v-model="newUser.email" type="email" name="email" id="email" class="form-control" required>
                                <div class="valid-feedback">Email valide</div>
                                <div class="invalid-feedback">Email invalide</div>
                            </div>
                             <div class="form-group">
                                <label>Mot de passe</label>
                                <div class="input-group" id="show_hide_password">
                                    <input class="form-control" aria-describedby="button-addon2" v-model="newUser.password" :type="inputType" autocomplete="on" name="password" required pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})">  
                                    <i @click.prevent="showPassword" :class="btnText" id="button-addon2" class="btn btn-dark" aria-hidden="true"></i>
                                       <div class="valid-feedback">Mot de passe valide</div>
                                     <div class="invalid-feedback">Mot de passe invalide</div>
                                </div>
                            </div>
                           
                            <!-- Affichage de l'erreur si elle existe-->
                            <div v-if="signupError" class="alert alert-danger" role="alert">
                               {{signupError}}
                            </div>
                            <div class="form-group mb-3 mt-4">
                                <button  type = "submit" class="btn btn-dark" value="submit">Inscrivez vous</button>
                            </div><br>
                            <div id="register-link" class="text-end">
                                 <!-- Router vers la route login-->
                                <router-link to="login" >Connectez vous</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>



export default {
 
   data : () => ({
          //Associè à la propriété 'type' de l'input qui contient le password
          inputType: 'password',
          //Associè à la propriété de la class de l'icone
          btnText: 'far fa-eye' , 
          //Contient les erreurs d'inscription
          signupError : "",
          //Objet contenant les données de formulaire saisis par l'utilisateur 
          newUser : {
                   firstName : '',
                   lastName : '',
                   email : '',
                   password : ''
          } 
    }),
   methods: {
       //Methods change le type de l'inpute de mdp et la class de l'icone
     showPassword() {
       if(this.inputType === 'password') {
          this.inputType = 'text'
          this.btnText = 'far fa-eye-slash'
       } else {
          this.inputType = 'password'
          this.btnText = 'far fa-eye'
       }
     },
     //Methods qui éxecute l'action 'USER_SIGN_UP'
      inscription() {
            this.$store.dispatch('USER_SIGN_UP', this.newUser)
            .then(() => {
                this.$router.push({ name: 'Home'});
            })
            .catch((error)=>{ this.signupError=error; console.log('erreeor',this.signupError)})
        },
    ValidationForm()
      {
       var form = document.querySelector('.needs-validation')
        form.classList.add('was-validated')
        if (form.checkValidity()) {
         this.inscription() 
        }

      }
 } 
}
</script>

<style scoped>
a{
    color:initial;
}
.container #signup-row #signup-column #signup-box {
  margin-top: 120px;
  border: 1px solid #9c9c9c;
  padding : 20px;
}
.container #signup-row #signup-column #signup-box #signup-form {
  padding: 20px;
}
.container #signup-row #signup-column #signup-box #signup-form #register-link {
  margin-top: -85px;
}
</style>