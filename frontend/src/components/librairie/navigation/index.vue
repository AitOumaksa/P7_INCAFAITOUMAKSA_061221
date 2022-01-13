
<!-- Barre de navigation  -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Tenth navbar example">
    <div class="container-fluid">
      <!-- Logo de groupmania  -->
      <router-link class="navbar-brand" to="/" ><img width="30" height="30" class="d-inline-block align-text-top" src="icon.svg"  alt="logo Groupomania" /> Groupomania</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-md-end" id="navbarsExample08">
        <ul class="navbar-nav">
          <!-- vérifie l'utulisateur si n'est pas authentifie affichage de link vers la page /login  -->
           <li  v-if="!isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/login">Connexion</router-link>
          </li>
          <!-- vérifie l'utulisateur si n'est authentifie affichage de linkvers la page /signup  -->
           <li  v-if="!isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/signup">Inscription</router-link>
          </li>
          <!-- vérifie si l'utulisateur est authentifie affichage de link la page /forum  -->
          <li  v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link " to="/forum">Accueil</router-link>
          </li>
          <!-- vérifie si l'utulisateur est authentifie affichage de link la page /profile  -->
          <li  v-if="isAuthenticated" class="nav-item dropdown" >
            <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-bs-toggle="dropdown" aria-expanded="false">{{name}}</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown08">
              <li> <router-link class="dropdown-item" to="/profile">Profile</router-link></li>
              <!--Déclencher un event @click si l'utilisateur se deconnecte renvoyer vers la page /login  -->
              <li  @click="logout"><router-link class="dropdown-item" to="/login">Déconnexion</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
import { mapGetters, mapState } from "vuex";


export default {
  name: "navigation",
  methods: {
    logout: function() {
      this.$store.dispatch('AUTH_LOGOUT').then(() => this.$router.push("/login"));
    }
  },
  computed: {
       //Récuperer dans les getters (auth.js) 'isAuthenticated'
    ...mapGetters(["isAuthenticated"]),
    //Recuperer du state(module user) le user.profile.lastName
    ...mapState({
      name: state => `${state.user.profile.lastName} `
    })
  }
};
</script>

<style scoped lang="scss">
.dropdown-menu{
  min-width: 7.5rem;
}

</style>
