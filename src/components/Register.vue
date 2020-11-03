<template>
  <div id="Register">
    <header>
      
        <h1>VanCode</h1>
        <span id="rightHeader">
          <button class="colorSecondaire" @click="$router.push('/')">Accueil</button>
          <Theme/>
        </span>

    </header> 
    <section id="formSection">
        <FormRegister /> 
    </section>
    <div id ="backgroundRegister"></div>
  </div>
</template>

<script>

import FormRegister from './Form/FormRegister.vue'
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

    FormRegister,
    Theme
  },
  
}
</script>

