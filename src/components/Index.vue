<template>
  <div id="index">
    <header>
      
        <h1>VanCode</h1>
        <span id="rightHeader">
      
          <button v-if="authenticated"  class="colorSecondaire" @click="$router.push('account')">{{pseudo}}</button>
          <button v-if="authenticated" class="grey" @click="logOut">Déconnexion</button>
          <button v-else class="colorSecondaire">Inscription</button>
        

          <Theme/>
        </span>

    </header> 
    <section id="formSection">
      <transition name="slide-fade" mode="out-in">
        <FormRoom v-if="authenticated"/>
        <FormCo v-else/> 
      </transition>
    </section>
    <div id ="background"></div>
  </div>
</template>

<script>

import FormRoom from './Form/FormCreateRoom.vue'
import FormCo from './Form/Connexion.vue'
import Theme from './ThemeChanger.vue'

export default {
  name: 'Index',
  data() {
    return {
      authenticated:localStorage.authenticated=="true",
      pseudo:localStorage.pseudo
    }
  },

  methods:{
    setAuthenticated(status,pseudo) {
      this.authenticated = status;
      localStorage.authenticated = "true";
      this.pseudo=pseudo;
      localStorage.pseudo = pseudo;
    },

    logOut(){
      this.authenticated = false;
      localStorage.authenticated = "false";
       this.pseudo="";
      localStorage.pseudo = "";
    }
  },

  components: {
    FormRoom,
    FormCo,
    Theme
  },
  
}
</script>

