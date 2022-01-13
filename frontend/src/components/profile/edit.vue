<template>
<div class="container rounded panel">
 
    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                 <avatar/>
                <span class="font-weight-bold">{{user.lastName}} {{user.firstName}}</span><!--<span class="text-black-50">{{user.email}}</span>-->
                <span> </span>
            </div>
            <div class="mt-3 text-center"><button class="btn btn-danger"  @click="deleteProfile" >Supprimer le compte</button></div>
        </div>
        <div class="col-md-7 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Paramètres du profile</h4>
                </div>
               
                <div class="row mt-2">
                    <form  class="form"  @submit.prevent="changerInfos">
                    <div class="mb-2"><b>Changer vos informations</b></div>
                      <div v-if="updateInfoError" class="alert alert-danger" role="alert">
                               {{updateInfoError}}
                    </div>
                    <div v-if="updateInfoSuccess" class="alert alert-success" role="alert">
                                    Modifications effectuées
                    </div>
                    <div class="col-md-7"><label class="labels">Nom</label><input type="text" class="form-control" placeholder="Nom" v-model="user.lastName"></div>
                    <div class="col-md-7 mb-2"><label class="labels">Prénom</label><input type="text" class="form-control" placeholder="Prénom"   v-model="user.firstName"   ></div>
                     <div class="form-group">
                     <label>A propos de</label>
                         <textarea class="form-control" rows="5" placeholder="Ma Bio" v-model="user.bio"></textarea>
                     </div>
                    <div class="mt-3 text-center"><button  type="submit" class="btn btn-primary password-button" >Sauvegarder les informations</button></div>
                    </form>
               </div>
                <div class="row mt-5">
                     <form  class="form"  @submit.prevent="changePassword">
                      <div class="mb-2"><b>Changer le mot de passe</b></div>
                       <div v-if="updateMdpError" class="alert alert-danger" role="alert">
                               {{updateMdpError}}
                        </div>
                        <div v-if="updateMdpSuccess" class="alert alert-success" role="alert">
                                        Mot de passe modifié
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3">
                              <label>Mot de passe actuel</label>
                              <div class="input-group" id="show_hide_password1">
                              <input class="form-control"  aria-describedby="button-addon2" autocomplete="on" v-model="mdp.password" :type="inputType" placeholder="••••••">
                              <i @click.prevent="showPassword()" :class="btnText" id="button-addon2" class="btn btn-dark" aria-hidden="true"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="mb-3">
                              <label>Nouveau mot de passe</label>
                            <div class="input-group" id="show_hide_password1">
                              <input class="form-control" aria-describedby="button-addon1" :type="inputType1" v-model="mdp.newPassword" autocomplete="on" placeholder="••••••">
                              <i @click.prevent="showPassword1()" :class="btnText1" id="button-addon1" class="btn btn-dark" aria-hidden="true"></i>
                            </div>
                            </div>
                          </div>
                        </div>
                        <div class="mt-3 text-center"><button type="submit" class="btn btn-primary password-button" >changer le mot de passe</button></div>
                      </form>  
               </div>
                
            </div>
        </div>
    </div>
</div>

</template>

<script>

import avatar from "../librairie/avatar/avatar.vue";
import store from "../../store";
export default {

       data : () => ({
            //Associè à la propriété 'type' de l'input qui contient le password
          inputType: 'password',
          inputType1: 'password',
          //Associè à la propriété de la class de l'icone
          btnText: 'far fa-eye' , 
          btnText1: 'far fa-eye' , 
           user : {
            firstName : store.state.user.profile.firstName,
            lastName : store.state.user.profile.lastName,
            bio : store.state.user.profile.bio,
            email : store.state.user.profile.email,
           },
           mdp : {
               newPassword :"",
               passsord : ""
           },
           updateInfoError:"",
           updateInfoSuccess:false,
           updateMdpError:"",
           updateMdpSuccess:false,
       }),
           components: {
            avatar,
         
        },
        methods: {
                showPassword() {
                      if(this.inputType === 'password') {
                          this.inputType = 'text',
                          this.btnText = 'far fa-eye-slash'
                      } else {
                          this.inputType = 'password',
                          this.btnText = 'far fa-eye'
                      }
                },
                  showPassword1() {
                      if(this.inputType1 === 'password') {
                          this.inputType1 = 'text',
                          this.btnText1 = 'far fa-eye-slash'
                      } else {
                          this.inputType1 = 'password',
                          this.btnText1 = 'far fa-eye'
                      }
                  },

                changerInfos () {
                     this.$store.dispatch('UPDATE_USER_INFO', this.user)
                     .then(()=> {this.updateInfoSuccess = true ; this.updateInfoError=""})
                     .catch((error) => {this.updateInfoError=error; this.updateInfoSuccess = false });
                },
                  changePassword () {
                     this.$store.dispatch('UPDATE_USER_PASSWORD', this.mdp)
                     .then(()=> {this.updateMdpSuccess = true ; this.updateMdpError=""})
                     .catch((error) => {this.updateMdpError=error;this.updateMdpSuccess = false });
                },
                deleteProfile () {
                   if ( confirm( "Voulez vous supprimer définitivemnt votre profile ?" ) )  
                    {  
                        this.$store.dispatch('USER_DELETE_PROFILE', this.user)
                     .then((res)=> {console.log(res);this.$emit('close',true);this.$router.push("/")})
                     .catch((error) => {console.log(error); });
                     }

                }
    },


}


</script>

<style scoped>

</style>