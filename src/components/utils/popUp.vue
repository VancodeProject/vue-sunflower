<template>
    <div  v-if="show" id="popUp">
      <div id="popUpContent" ref="popUpContent">
        <div v-if="typePopUp=='listeUser'">
          <div id="title" :style="{'background-color': content.codeZone.color }">
              <h1>{{content.codeZone.title}}</h1>
              <i class="fas fa-times" v-on:click="setShow(false,null)" aria-hidden="true"></i>
          </div>
    
          <br>
          <div id = "users">
            <div class="usersZone">
              <ListUser title="Codeurs déjà selectionnée"  :users="content.listUserSelected" editable="true" :listId="1" @send-user="switchUser"/>
            </div>

            <div id="separator"></div>

            <div class="usersZone">
              <ListUser title="Autres utilisateurs"  :users="content.listUser" editable="true" :listId="2" @send-user="switchUser"/>
            </div>
          </div>
        </div>
        <div v-else>
          <form v-on:submit.prevent="addUser">
            <h2>Entrez un pseudo</h2>
            <p>Avant de pouvoir coder, donnes ton nom pour savoir qui sait qui code mal ! <br></p>

            <label for="userName">Identifiant<b class="errorMessage" v-if="erorLogin[0]">Au moins deux caractères</b></label>  
            <input v-if="erorLogin[0]" type="text" class="errorInput"  name="userName" id="userName" v-model="userName"/>
            <input v-else type="text" class="validInput"  name="userName" id="userName" v-model="userName"/>

            <button class="colorSecondaire">Codons</button>
          </form>
        </div>
        
      </div>
    </div>
</template>

<script>

 import ListUser from '../SalleComponents/listUser.vue';
  export default {

    props: ["typePopUp"],
    data () {
      return {
        show:false,
        content : null,
        erorLogin: [],
        userName:""
      }
    },

    components:{
      ListUser
    },

    methods:{
      setShow(value, content){
        this.show = value;

        value? this.setContent(content):this.setContent(null);
      },

      setContent(content){
        this.content = content;
      },
      
      switchUser(id, listId) {
        let index;
        let user;

        if(listId == 1) {
          index = this.findIndexWithId(id, this.content.listUserSelected);
          user = this.content.listUserSelected.splice(index, 1); 
          
          this.content.listUser.push(user[0])
        }
        else if(listId == 2){
          index = this.findIndexWithId(id, this.content.listUser);
          user = this.content.listUser.splice(index, 1); 
          
          this.content.listUserSelected.push(user[0])
        }

        this.$emit('move-user', this.content.codeZone.id, id, listId!=1);
      },

      findIndexWithId(id,arrayToFind){
        for(let i = 0; i < arrayToFind.length; i++){
          if(id == arrayToFind[i].id) return i;
        }
      },

      addUser(){
        this.erorLogin = []; // gestion erreurs champs!
        if(this.userName!= "" && this.userName.length >= 2) {
          this.$emit('add-user', this.userName, false, true);
          this.setShow(false,null);
        }else {
            this.erorLogin.push(true);
        }
      }
    
    },

    watch:{
      userName() {
        this.erorLogin[0] = false;
      },
    },
  }
  
</script>

<style lang="css" scoped>
  h2{
    margin-top: 2%;
  }
  
  button{
    margin:5% 0%;
  }

</style>
