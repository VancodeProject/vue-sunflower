<template>
    <form v-on:submit.prevent="login" method="POST">
        <h2>Connexion</h2>
        <p>Connecte toi avant de pouvoir créer une salle de code simultané! <br></p>

        <b class="errorMessage" v-if="erorLogin[0]">Les champs sont vides ! </b>

        <label for="pseudo">Identifiant<b class="errorMessage" v-if="erorLogin[1]">Identifiant inconnu ! </b></label>  
        <input v-if="erorLogin[1]||erorLogin[0]" type="text" class="errorInput"  name="pseudo" id="pseudo" v-model="pseudo"/>
        <input v-else type="text" class="validInput"  name="pseudo" id="pseudo" v-model="pseudo"/>
       

        <label for="mdp">Mot de passe<b class="errorMessage" v-if="erorLogin[2]">Mauvais mot de passe ! </b></label>
        <input v-if="erorLogin[2]||erorLogin[0]" type="password" class="errorInput" name="mdp" id="mdp" v-model="mdp">
        <input v-else type="password" class="validInput" name="mdp" id="mdp" v-model="mdp">
        

        <span id ="checkBoxForm">
            <input type="checkbox" name="checkbox" id="checkbox">
            <label id="labelCheckBox">Se souvenir de moi !</label>
        </span>
        
        <button class="colorSecondaire">Créer une salle (1/2)</button>
    </form>
</template>

<script>

export default {
  data() {
    return {
      pseudo:'',
      mdp:'',
      erorLogin: []
    };
  },

  methods: {
    login() {
      this.erorLogin = [];
       if(this.pseudo!= "" || this.mdp != "") {
          this.erorLogin.push(false);
          if(this.pseudo == "Admin" ||this.pseudo == "Alexandre"||this.pseudo == "Thomas") {
            this.erorLogin.push(false);
            if(this.mdp == "test"){
              this.erorLogin.push(false);
              this.$parent.setAuthenticated(true,this.pseudo);
            }else{
              this.erorLogin.push(true);
            }
          } else {
              this.erorLogin.push(true);
          }
        } else {
            this.erorLogin.push(true);
        }
    },
  },
  
  watch:{
    pseudo() {
       this.erorLogin[1] = null;
       this.erorLogin[0] = null;
    },

    mdp(){
      this.erorLogin[2] = null;
       this.erorLogin[0] = null;
    }
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