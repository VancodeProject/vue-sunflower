<template>
    <div id="infoProfil">  
        <h2>- Informations personnels</h2>
        <p>Votre paneau d'utilisateurs, vous permez de changer à volonter vos informations personnels ainsi que votre mot de passe ! </p>

        <div id="updateProfil" >
            <form method="POST">
                <label for="pseudo">Identifiant</label>  
                <input type="text" value="Alexandre" class="validInput"  name="pseudo" id="pseudo" />

                <label for="adress">Adresse Email</label>  
                <input type="email" value="contact@email.com" class="validInput"  name="adress" id="adress"/>

                <span id="zoneButton" >
                    <button class="colorSecondaire">Valider les changements</button>
                    <button class="grey">Annuler</button>
                </span>     
            </form>

            <div id="separator">

            </div>
            <form method="POST">
                
                <label for="mdp">Mot de passe actuel</label>
                <PasswordInput v-model="mdp" v-on:sendDataParent="reciveDataFromChild ($event)" classInput="validInput"/>

                 <label for="mdp">Nouveau mot de passe</label>
                <PasswordInput v-model="mdp" v-on:sendDataParent="reciveDataFromChild ($event)" classInput="validInput"/>

                <label for="mdp">Répéter le nouveau mot de passe</label>
                <PasswordInput v-model="mdp" v-on:sendDataParent="reciveDataFromChild ($event)" classInput="validInput"/>
                
                <button class="colorSecondaire">Changer de mot de passe</button>
            </form>
        </div>
       
    </div>
</template>

<script>
import PasswordInput from '../Form/PasswordInput.vue'
export default {
      
  components:{
    PasswordInput
  },

  methods:{
    reciveDataFromChild (recivedData) {
      this.mdp = recivedData;

      this.erorLogin[2] = null;
      this.erorLogin[0] = null;
    }
  }
};
</script>
<style scoped>

    form {
        width: 40%;
        margin:0;
        margin-right: 1.4%;
    }

    button{
        margin-top: 7%;
    }

    h3{
        margin-bottom:2% ;
    }


    p {
        font-size:15px;
    }

</style>
