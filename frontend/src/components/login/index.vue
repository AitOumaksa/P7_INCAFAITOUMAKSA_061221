<template>

        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12 panel bg-dark">
                        <!-- Formulaire de la page login-->
                        <!-- déclencher l'event submit 'validationForm'-->
                        <form  @submit.prevent="ValidationForm()"  id="login-form" class="needs-validation"  novalidate>
                            <h3 class="text-center ">Connexion</h3>
                            <div class="mb-3">
                                <label for="email" >Email:</label><br>
                                <input v-model="user.email" type="email" name="email" id="email" class="form-control" required>
                                 <div class="valid-feedback">Email valide</div>
                                 <div class="invalid-feedback">Email invalide</div>  
                            </div>
                            <div class="mb-3">
                                 <label>Mot de passe</label>
                                <div class="input-group" id="show_hide_password1">
                                  <!--L'icone  -->
                                    <input class="form-control" aria-describedby="button-addon1" v-model="user.password" :type="inputType" autocomplete="on" name="password" required>
                                    <i @click.prevent="showPassword" :class="btnText" id="button-addon1" class="btn btn-dark" aria-hidden="true"></i>
                                     
                                </div>
                            </div>
                            <!-- Affichage de l'erreur si elle existe-->
                            <div v-if="loginError" class="alert alert-danger" role="alert">
                               {{loginError}}
                            </div>
                            <div class="mb-3">
                                <button type = "submit" name="submit" class="btn btn-dark btn-md" value="submit">Connexion</button>
                            </div><br>
                            <div id="register-link" class="text-end">
                                <!-- Router vers la route signup-->
                                <router-link to="/signup" >Inscrivez vous</router-link>
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
       //Contient les erreurs d'authentification
       loginError : "",
       //Objet contenant l'email et le mdp saisi par l'utilisateur 
       user : {
           email : '',
           password : ''
       }
   }),
   methods:{ 
        showPassword() {
       if(this.inputType === 'password') {
          this.inputType = 'text'
          this.btnText = 'far fa-eye-slash'
       } else {
          this.inputType = 'password'
          this.btnText = 'far fa-eye'
       }
     },
       //Methods qui éxecute l'action 'AUTH_REQUEST'
    connexion() {
            this.$store.dispatch('AUTH_REQUEST', this.user)
            .then((res) => {  console.log(res);
            //Redirection vers la route Home en cas de "success" 
                this.$router.push({ name: 'Home'});
            })
            .catch((error) => {console.log(error)
            //Enregistre l'erreure dans la var 'loginError'
              this.loginError = error;
               
            })
        },
    ValidationForm()
      {
       var form = document.querySelector('.needs-validation')
        form.classList.add('was-validated')
        if (form.checkValidity()) {
         this.connexion() 
        }

      }

    } 
     
}
</script>

<style scoped>

.container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 600px;
  height: auto;
  border: 1px solid #9c9c9c;
  background-color: #EAEAEA;
  padding : 20px;
}
 .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
 .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -85px;
}
a{
  color:black;
}
</style>