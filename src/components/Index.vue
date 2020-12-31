<template>
  <div id="index">
    <header>
        <h1>Van<span class="logo"> {</span>Code<span class="logo">}</span></h1>
        <span id="rightHeader">
      
          <button v-if="isLoggedIn"  class="colorSecondaire" @click="$router.push('account')">{{user.userName}}</button>
          <button v-if="isLoggedIn"  class="grey" @click="logout">Déconnexion</button>
          <button v-else class="colorSecondaire" @click="$router.push('register')">Inscription</button>
        
          <Theme/>
        </span>
    </header> 
    <section id="formSection">   
      <Notification :content='"Bonjour "+user.userName' ref="connect"/>
      <transition name="slide-fade" mode="out-in">
        <FormRoom v-if="isLoggedIn"/>
        <FormCo v-else/> 
      </transition>
    </section>
    <div id ="background"></div>
  </div>
</template>

<script>

import FormRoom from './Form/FormCreateRoom.vue'
import FormCo from './Form/Connexion.vue'
import Theme from './ThemeChanger.vue'
import Notification from './utils/notification.vue'
import {getInfoUser} from '../assets/utils/backend.js'

export default {
  name: 'Index',

  data(){
    return{
      user:''
    }
  
  },

  created() {
    if(this.$store.getters.isLoggedIn){
      this.getUser();
    }
  },
  
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },

  methods:{
    setAuthenticated() {
      this.$refs.connect.setShow(true);
      this.getUser();
    },

    logout: function () {
      this.$store.dispatch('logout');
    },

    async getUser(){
      this.user = await getInfoUser(this.$store.getters.isLoggedIn);
    }
  },
  
  components: {
    FormRoom,
    FormCo,
    Theme,
    Notification
  },
  
}
</script>

