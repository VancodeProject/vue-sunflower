<template>
    <form v-on:submit.prevent="register">
        <h2>Inscription</h2>
        <p>Bravo! Tu es sur le point de rejoindre Vancode, à toi les salles de codes simultanées!<br></p>

        <label for="userName">Identifiant</label>  
        <input type="text" placeholder="vancode" class="validInput"  name="userName" id="userName" v-model="userName"/>

        <label for="email">Adresse Email</label>  
        <input type="email" placeholder="contact@email.com" class="validInput"  name="email" id="email" v-model="email"/>

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
      email:'',
      userName:'',
      password:'',
    };
  },

  methods: {
    register() {
      let data = {
          email: this.email,
          userName: this.userName,
          password: this.password,
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
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