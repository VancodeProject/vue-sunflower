<template>
    <form v-on:submit.prevent="register">
        <h2>Inscription</h2>
        <p>Bravo! Tu es sur le point de rejoindre Vancode, à toi les salles de codes simultanées!<br></p>

        <b class="errorMessage" v-if="erorLogin[4]">Une erreur est survenue lors de l'inscription</b>
        <label for="userName">Identifiant<b class="errorMessage" v-if="erorLogin[0]">{{msgError[0]}}</b></label>  
        <input v-if="erorLogin[0]" placeholder="vancode" type="text" class="errorInput"  name="userName" id="userName" v-model="userName"/>
        <input v-else placeholder="vancode" type="text" class="validInput"  name="userName" id="userName" v-model="userName"/>

        <label for="email">Adresse Email<b class="errorMessage" v-if="erorLogin[1]">{{msgError[1]}}</b></label>  
        <input v-if="erorLogin[1]" placeholder="vancode" type="email" class="errorInput"  name="email" id="email" v-model="email"/>
        <input  v-else type="email" placeholder="contact@email.com" class="validInput"  name="email" id="email" v-model="email"/>

        <label for="password">Mot de passe<b class="errorMessage" id="passwordError" v-if="erorLogin[2]">Mauvais mot de passe ! </b></label>
        <PasswordInput v-model="password" v-if="erorLogin[2]" v-on:sendDataParent="reciveDataFromChild ($event)" classInput="errorInput"/>
        <PasswordInput v-model="password" v-else v-on:sendDataParent="reciveDataFromChild ($event)" classInput="validInput"/>
          
        <button class="colorSecondaire">Inscription</button>
    </form>
</template>

<script>

import PasswordInput from './PasswordInput.vue'
import {checkUserName} from '../../assets/utils/checkInput.js'
import {checkEmail} from '../../assets/utils/checkInput.js'
import {checkPassword} from '../../assets/utils/checkInput.js'
export default {
  data() {
    return {
      email:'',
      userName:'',
      password:'',
      erorLogin: [],
      msgError:[]
    };
  },

  methods: {
    register() {
      this.erorLogin = [];
      this.msgError = [];  

      let data = {
          email: this.email,
          userName: this.userName,
          password: this.password,
      };
      
      this.msgError.push("Au moins 3 caractères");
      this.msgError.push("Email invalide");

      this.erorLogin.push(checkUserName(this.userName));
      this.erorLogin.push(checkEmail(this.email));
      this.erorLogin.push(checkPassword(this.password));

      if(!this.erorLogin[0]&&!this.erorLogin[1]&&!this.erorLogin[2]){
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => {
          if(err.response.data.code==5){
            this.erorLogin.splice(1,1,true);
            this.msgError.splice(1,1,"L'email est deja utilisé");
            //document.getElementById("errorMessage").innerHTML="test";
          }

          if(err.response.data.code==6){
            this.erorLogin.splice(0,1,true);
            this.msgError.splice(0,1,"L'identifiant est deja utilisé");
            //document.getElementById("errorMessage").innerHTML="test";
          }
        })
      }
    },

    reciveDataFromChild (recivedData) {
      this.password = recivedData.password;
      this.erorLogin[2] = false;
    }
  },

  watch:{
    userName() {
       this.erorLogin[0] = false;
    },

    email() {
       this.erorLogin[1] = false;
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