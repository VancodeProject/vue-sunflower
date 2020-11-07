<template>
    <form v-on:submit.prevent="register">
        <h2>Inscription</h2>
        <p>Bravo! Tu es sur le point de rejoindre Vancode, à toi les salles de codes simultanées!<br></p>

        <label for="pseudo">Identifiant</label>  
        <input type="text" placeholder="vancode" class="validInput"  name="pseudo" id="pseudo" v-model="pseudo"/>

        <label for="adress">Adresse Email</label>  
        <input type="email" placeholder="contact@email.com" class="validInput"  name="adress" id="adress" v-model="adress"/>

        <label for="mdp">Mot de passe</label>
        <PasswordInput classInput="validInput"/>
          
        <button class="colorSecondaire">Inscription</button>
    </form>
</template>

<script>

import PasswordInput from './PasswordInput.vue'

export default {
  data() {
    return {
      adress:'',
      pseudo:'',
      mdp:'',
    };
  },

  methods: {
    register() {
      this.$router.push('/');
    },
  },

  components:{
    PasswordInput
  }

};
</script>

<style scoped>
  button{
    margin-top: 7%;
  }

</style>