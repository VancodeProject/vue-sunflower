<template>
    <div id="infoProfil">  
        <h2>- Informations personnels</h2>
        <p>Votre paneau d'utilisateurs, vous permez de changer à volonter vos informations personnels ainsi que votre mot de passe ! </p>
        
        <Notification content="Mot de passe modifié!" ref="notifpassword"/>
        <Notification content="Information de compte modifié!" ref="notifAccount"/>
       
        <div id="updateProfil" >
            <form  v-on:submit.prevent="update">
                <label for="pseudo">Identifiant</label><b class="errorMessage" v-if="erorUserForm[0]">{{msgErrorUserForm[0]}}</b>  
                <input type="text" v-if="erorUserForm[0]" v-model="user.username" class="errorInput"  name="pseudo" id="pseudo"  />
                <input type="text" v-else v-model="user.username" class="validInput"  name="pseudo" id="pseudo"  />

                <label for="adress">Adresse Email</label><b class="errorMessage" v-if="erorUserForm[1]">{{msgErrorUserForm[1]}}</b> 
                <input type="email" v-if="erorUserForm[1]" v-model="user.email" class="validInput"  name="adress" id="adress" />
                 <input type="email" v-else  v-model="user.email" class="validInput"  name="adress" id="adress" />

                <span id="zoneButton" >
                    <button class="colorSecondaire">Valider les changements</button>
                    <button type="button" v-on:click="resetUser" class="grey">Annuler</button>
                </span>     
            </form>

            <div id="separator">

            </div>
            <form v-on:submit.prevent="updatepassword"> 
                <label>Mot de passe actuel<b class="errorMessage" v-if="erorChangepassword[0]">{{msgErrorPassword[0]}}</b></label>
                <PasswordInput v-model="password" v-if="erorChangepassword[0]" v-on:sendDataParent="reciveDatapasswordFromChild ($event)" classInput="errorInput"/>
                <PasswordInput v-model="password" v-else v-on:sendDataParent="reciveDatapasswordFromChild ($event)" classInput="validInput"/>

                <b class="errorMessage" v-if="erorChangepassword[1]">{{msgErrorPassword[1]}}</b>
                 <label>Nouveau mot de passe</label>
                <PasswordInput v-model="newpassword" v-if="erorChangepassword[1]" v-on:sendDataParent="reciveDataMpdNewFromChild ($event)" classInput="errorInput"/>
                <PasswordInput v-model="newpassword" v-else v-on:sendDataParent="reciveDataMpdNewFromChild ($event)" classInput="validInput"/>

                <label>Répéter le nouveau mot de passe</label>
                <PasswordInput v-model="newpasswordRepeat" v-if="erorChangepassword[1]" v-on:sendDataParent="reciveDatapasswordNewCheckFromChild ($event)" classInput="errorInput"/>
                <PasswordInput v-model="newpasswordRepeat" v-else v-on:sendDataParent="reciveDatapasswordNewCheckFromChild ($event)" classInput="validInput"/>
                
                <button class="colorSecondaire">Changer de mot de passe</button>
            </form>
        </div>
       
    </div>
</template>

<script>
import PasswordInput from '../Form/PasswordInput.vue'
import Notification from '../utils/notification.vue'
import {getInfoUser} from '../../assets/utils/backend.js'
//import {updateInfoUser} from '../../assets/utils/backend.js'
import {checkUserName} from '../../assets/utils/checkInput.js'
import {checkEmail} from '../../assets/utils/checkInput.js'
import {checkPassword} from '../../assets/utils/checkInput.js'

export default {

  data() {
    return {
      user:'',
      password:'',
      newpassword:'',
      newpasswordRepeat:'',
      erorChangepassword: [],
      msgErrorPassword:[],
      erorUserForm: [],
      msgErrorUserForm:[]
    };
  },

    async created(){
     this.user = await getInfoUser(this.$store.getters.isLoggedIn);   
    },

  components:{
    PasswordInput,
    Notification
  },

    watch:{
        password(){
            this.erorChangepassword[0] = null;
        },
        newpassword(){
            this.erorChangepassword[1] = null;
        },
        newpasswordRepeat(){
            this.erorChangepassword[1] = null;
        },

        'user.username':function(){
            this.erorUserForm[0]=null; 
        },

        'user.email':function(){
            this.erorUserForm[1]=null; 
        }
    },

    methods:{
    reciveDatapasswordFromChild (recivedData) {
      this.password = recivedData.password;
    },

    reciveDataMpdNewFromChild(recivedData){
       this.newpassword = recivedData.password;
    },

    reciveDatapasswordNewCheckFromChild(recivedData){
        this.newpasswordRepeat = recivedData.password;
    },

    async updatepassword(){
        this.erorChangepassword=[];
        this.msgErrorPassword=[];
        this.msgErrorPassword.push("Mauvais mot de passe");
        this.msgErrorPassword.push("Les deux mots de passe doivent être identique");

        if(this.password!="test"){
            this.erorChangepassword.push(true);
        }else{
             this.erorChangepassword.push(false);
        }
        
        if(this.newpassword!=this.newpasswordRepeat){
            this.erorChangepassword.push(true); 
        }else{
            if(checkPassword(this.newpassword)){
                this.msgErrorPassword.splice(1,1,"Minimum 6 caractères")
                this.erorChangepassword.push(true);
            }else{
                this.erorChangepassword.push(false);
            }            
        }
   
        if(!this.erorChangepassword[0]&&!this.erorChangepassword[1]){
            this.$refs.notifpassword.setShow(true);
        }
    },
    async resetUser(){
         this.user = await getInfoUser(this.$store.getters.isLoggedIn);  
         this.erorUserForm=[]; 
    },

    async update(){
        this.erorUserForm=[];
        this.msgErrorUserForm=[];

        this.msgErrorUserForm.push("Au moins 3 caractères");
        this.msgErrorUserForm.push("Email invalide");

        this.erorUserForm.push(checkUserName(this.user.username));
        this.erorUserForm.push(checkEmail(this.user.email));

        if(!this.erorUserForm[0]&&!this.erorUserForm[1]){
            
            this.$refs.notifAccount.setShow(true);
            //let rep = await updateInfoUser(this.user);

            /*if(rep.resp.response.data.code==5){
                this.erorLogin.splice(1,1,true);
                this.msgErrorUserForm.splice(1,1,"L'email est deja utilisé");
            }

            if(rep.resp.response.data.code==6){
                this.erorLogin.splice(0,1,true);
                this.msgErrorUserForm.splice(0,1,"L'identifiant est deja utilisé");
            }*/

            //alert(rep);
        }
      
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
