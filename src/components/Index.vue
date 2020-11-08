<template>
  <div id="index">
    <header>
        <h1>VanCode</h1>
        <span id="rightHeader">
      
          <button v-if="isLoggedIn"  class="colorSecondaire" @click="$router.push('account')">Alexandre</button>
          <button v-if="isLoggedIn"  class="grey" @click="logout">Déconnexion</button>
          <button v-else class="colorSecondaire" @click="$router.push('register')">Inscription</button>
        
          <Theme/>
        </span>
    </header> 
    <section id="formSection">   
      <Notification content='Bonjour Alexandre' ref="connect"/>
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

export default {
  name: 'Index',

  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },

  methods:{
    setAuthenticated() {
      this.$refs.connect.setShow(true);
    },

    logout: function () {
      this.$store.dispatch('logout');
    },

  },
  
  components: {
    FormRoom,
    FormCo,
    Theme,
    Notification
  },
  
}
</script>

