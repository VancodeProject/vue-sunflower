<template>
    <div id="infoProfil">  
        <h2>- Informations personnels</h2>
        <p>Votre paneau d'utilisateurs, vous permez de changer à volonter vos informations personnels ainsi que votre mot de passe ! </p>
        
        <Notification content="Mot de passe modifié!" ref="notifpassword"/>
        <Notification content="Information de compte modifié!" ref="notifAccount"/>
       
        <div id="updateProfil" >
            <form  v-on:submit.prevent="update">
                <label for="pseudo">Identifiant</label><b class="errorMessage" v-if="errorUserForm[0]">{{msgErrorUserForm[0]}}</b>  
                <input type="text" v-if="errorUserForm[0]" v-model="user.userName" class="errorInput"  name="pseudo" id="pseudo"  />
                <input type="text" v-else v-model="user.userName" class="validInput"  name="pseudo" id="pseudo"  />

                <label for="adress">Adresse Email</label><b class="errorMessage" v-if="errorUserForm[1]">{{msgErrorUserForm[1]}}</b> 
                <input type="email" v-if="errorUserForm[1]" v-model="user.email" class="validInput"  name="adress" id="adress" />
                 <input type="email" v-else  v-model="user.email" class="validInput"  name="adress" id="adress" />

                <span id="zoneButton" >
                    <button class="colorSecondaire">Valider les changements</button>
                    <button type="button" v-on:click="resetUser" class="grey">Annuler</button>
                </span>     
            </form>

            <div id="separator">

            </div>
            <form v-on:submit.prevent="updatepassword"> 
                <label>Mot de passe actuel<b class="errorMessage" v-if="errorChangepassword[0]">{{msgErrorPassword[0]}}</b></label>
                <PasswordInput v-model="password" v-if="errorChangepassword[0]" v-on:sendDataParent="reciveDatapasswordFromChild ($event)" classInput="errorInput"/>
                <PasswordInput v-model="password" v-else v-on:sendDataParent="reciveDatapasswordFromChild ($event)" classInput="validInput"/>

                <b class="errorMessage" v-if="errorChangepassword[1]">{{msgErrorPassword[1]}}</b>
                 <label>Nouveau mot de passe</label>
                <PasswordInput v-model="newpassword" v-if="errorChangepassword[1]" v-on:sendDataParent="reciveDataMpdNewFromChild ($event)" classInput="errorInput"/>
                <PasswordInput v-model="newpassword" v-else v-on:sendDataParent="reciveDataMpdNewFromChild ($event)" classInput="validInput"/>

                <label>Répéter le nouveau mot de passe</label>
                <PasswordInput v-model="newpasswordRepeat" v-if="errorChangepassword[1]" v-on:sendDataParent="reciveDatapasswordNewCheckFromChild ($event)" classInput="errorInput"/>
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
import {updateMDP} from '../../assets/utils/backend.js'
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
      errorChangepassword: [],
      msgErrorPassword:[],
      errorUserForm: [],
      msgErrorUserForm:[]
    };
  },

    async created(){
     this.user = await getInfoUser(this.$store.getters.isLoggedIn);   
     //console.log(this.user);
    },

  components:{
    PasswordInput,
    Notification
  },

    watch:{
        password(){
            this.errorChangepassword[0] = null;
        },
        newpassword(){
            this.errorChangepassword[1] = null;
        },
        newpasswordRepeat(){
            this.errorChangepassword[1] = null;
        },

        'user.userName':function(){
            this.errorUserForm[0]=null; 
        },

        'user.email':function(){
            this.errorUserForm[1]=null; 
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

    updatepassword(){
        this.errorChangepassword=[];
        this.msgErrorPassword=[];
        this.msgErrorPassword.push("Mauvais mot de passe");
        this.msgErrorPassword.push("Les deux mots de passe doivent être identique");

       
        this.errorChangepassword.push(false);
        
        
        if(this.newpassword!=this.newpasswordRepeat){
            this.errorChangepassword.push(true); 
        }else{
            if(checkPassword(this.newpassword)){
                this.msgErrorPassword.splice(1,1,"Minimum 6 caractères")
                this.errorChangepassword.push(true);
            }else{
                this.errorChangepassword.push(false);
            }            
        }
   
        if(!this.errorChangepassword[0]&&!this.errorChangepassword[1]){
            let data = {
                password: this.password,
                newpassword: this.newpassword,
                newpasswordRepeat: this.newpasswordRepeat,
            };

            updateMDP(this.$store.getters.isLoggedIn,data).then(() => {
                this.$refs.notifpassword.setShow(true)}
            )
            .catch(err => {
               if(err.response.data.code==3){
                    this.errorChangepassword.splice(0,1,true);
                }
            })
            this.$refs.notifpassword.setShow(true);
        }
    },
    async resetUser(){
         this.user = await getInfoUser(this.$store.getters.isLoggedIn);  
         this.erorUserForm=[]; 
    },

    async update(){
        this.errorUserForm=[];
        this.msgErrorUserForm=[];

        this.msgErrorUserForm.push("Au moins 3 caractères");
        this.msgErrorUserForm.push("Email invalide");

        this.errorUserForm.push(checkUserName(this.user.userName));
        this.errorUserForm.push(checkEmail(this.user.email));

        if(!this.errorUserForm[0]&&!this.errorUserForm[1]){
            this.$store.dispatch('update', this.user)
            .then(() =>   this.$refs.notifAccount.setShow(true))
            .catch(err => {
               if(err.response.data.code==5){
                    this.errorUserForm.splice(1,1,true);
                    this.msgErrorUserForm.splice(1,1,"L'email est deja utilisé");
                }

                if(err.response.data.code==6){
                    this.errorUserForm.splice(0,1,true);
                    this.msgErrorUserForm.splice(0,1,"L'identifiant est deja utilisé");
                }
            })
            
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
