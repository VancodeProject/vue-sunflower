<template>
    <div id="infoProfil">  
        <h2>- Informations personnels</h2>
        <p>Votre paneau d'utilisateurs, vous permez de changer à volonter vos informations personnels ainsi que votre mot de passe ! </p>
        
        <Notification content="Mot de passe modifié!" ref="notifMdp"/>
        <Notification content="Information de compte modifié!" ref="notifAccount"/>
       
        <div id="updateProfil" >
            <form  v-on:submit.prevent="update">
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
            <form v-on:submit.prevent="updateMdp"> 
                <label>Mot de passe actuel<b class="errorMessage" v-if="erorChangeMdp[0]">Mauvais mot de passe</b></label>
                <PasswordInput v-model="mdp" v-if="erorChangeMdp[0]" v-on:sendDataParent="reciveDataMdpFromChild ($event)" classInput="errorInput"/>
                <PasswordInput v-model="mdp" v-else v-on:sendDataParent="reciveDataMdpFromChild ($event)" classInput="validInput"/>

                <b class="errorMessage" v-if="erorChangeMdp[1]">Les deux mots de passe doivent être identique</b>
                 <label>Nouveau mot de passe</label>
                <PasswordInput v-model="newmdp" v-if="erorChangeMdp[1]" v-on:sendDataParent="reciveDataMpdNewFromChild ($event)" classInput="errorInput"/>
                <PasswordInput v-model="newmdp" v-else v-on:sendDataParent="reciveDataMpdNewFromChild ($event)" classInput="validInput"/>

                <label>Répéter le nouveau mot de passe</label>
                <PasswordInput v-model="newmdpRepet" v-if="erorChangeMdp[1]" v-on:sendDataParent="reciveDataMdpNewCheckFromChild ($event)" classInput="errorInput"/>
                <PasswordInput v-model="newmdpRepet" v-else v-on:sendDataParent="reciveDataMdpNewCheckFromChild ($event)" classInput="validInput"/>
                
                <button class="colorSecondaire">Changer de mot de passe</button>
            </form>
        </div>
       
    </div>
</template>

<script>
import PasswordInput from '../Form/PasswordInput.vue'
import Notification from '../utils/notification.vue'
export default {

  data() {
    return {
      mdp:'',
      newmdp:'',
      newmdpRepet:'',
      erorChangeMdp: []
    };
  },

  components:{
    PasswordInput,
    Notification
  },

    watch:{
        mdp(){
            this.erorChangeMdp[0] = null;
        },
        newmdp(){
            this.erorChangeMdp[1] = null;
        },
        newmdpRepet(){
            this.erorChangeMdp[1] = null;
        }
    },

    methods:{
    reciveDataMdpFromChild (recivedData) {
      this.mdp = recivedData.mdp;
    },

    reciveDataMpdNewFromChild(recivedData){
       this.newmdp = recivedData.mdp;
    },

    reciveDataMdpNewCheckFromChild(recivedData){
        this.newmdpRepet = recivedData.mdp;
    },

    updateMdp(){
        this.erorChangeMdp=[];
  
        if(this.mdp!="test"){
            this.erorChangeMdp.push(true);
        }else{
             this.erorChangeMdp.push(false);
        }

        if(this.newmdp!=this.newmdpRepet){
            this.erorChangeMdp.push(true);
           
        }else{
            this.erorChangeMdp.push(false);
        }
   
        if(!this.erorChangeMdp[0]&&!this.erorChangeMdp[1]){
            this.$refs.notifMdp.setShow(true);
        }
    },
    
    update(){
        this.$refs.notifAccount.setShow(true);
    }
  }
};
</script>
<style scoped>

    form {
        width: 40%;
        margin:0;
        margin-right: 2%;
    }

    button{
        margin-top: 7%;
    }

    h3{
        margin-bottom:1.8% ;
    }


    p {
        font-size:15px;
    }

</style>
