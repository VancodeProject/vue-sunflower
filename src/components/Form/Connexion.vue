<template>
    <form v-on:submit.prevent="login" >
        <h2>Connexion</h2>
        <p>Connecte toi avant de pouvoir créer une salle de code simultané! <br></p>

        <b class="errorMessage" v-if="erorLogin[0]">Les champs sont vides ! </b>

        <label for="userName">Identifiant<b class="errorMessage" v-if="erorLogin[1]">Identifiant inconnu ! </b></label>  
        <input v-if="erorLogin[1]||erorLogin[0]" type="text" class="errorInput"  name="userName" id="userName" v-model="userName"/>
        <input v-else type="text" class="validInput"  name="userName" id="userName" v-model="userName"/>
       

        <label for="password">Mot de passe<b class="errorMessage" v-if="erorLogin[2]">Mauvais mot de passe ! </b></label>
        <PasswordInput v-model="password" v-if="erorLogin[2]||erorLogin[0]" v-on:sendDataParent="reciveDataFromChild ($event)" classInput="errorInput"/>
        <PasswordInput v-model="password" v-else v-on:sendDataParent="reciveDataFromChild ($event)" classInput="validInput"/>

        <!--<span id ="checkBoxForm">
            <input type="checkbox" name="checkbox" id="checkbox">
          
            <label id="labelCheckBox">rester connecté !</label>

        </span>-->
        
        <button class="colorSecondaire">Créer une salle (1/2)</button>
    </form>
</template>

<script>
import PasswordInput from './PasswordInput.vue'

export default {
  data() {
    return {
      userName:'',
      password:'',
      erorLogin: []
    };
  },

  methods: {
    login(){
      this.erorLogin = []; // gestion erreurs champs!
      if(this.userName!= "" || this.password != "") {
        let userName = this.userName
        let password = this.password
        this.$store.dispatch('login', { userName, password }).then(() => {
          this.$parent.setAuthenticated();
          this.$parent.$userName = userName;
        }).catch(err => {
          this.erorLogin.push(false);

          if(err.response.data.code==1){
            this.erorLogin.push(true);
          }else{
            this.erorLogin.push(false);
            this.erorLogin.push(true);
          }
          
        })
      }else {
          this.erorLogin.push(true);
      }
    },

    reciveDataFromChild (recivedData) {
      this.password = recivedData.password;
      this.erorLogin[2] = false;
      this.erorLogin[0] = false;
    }

  },
  
  watch:{
    userName() {
       this.erorLogin[1] = false;
       this.erorLogin[0] = false;
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

  input[type="checkbox"]{
    width:0;
    margin-right: 5%;
  }

  label:last-child{
    color:#999;
  }

 input[type="checkbox"]:hover{
    color:red;
    border-color: red;
    background-color: red;
  }
</style>