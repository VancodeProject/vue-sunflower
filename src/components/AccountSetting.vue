<template>
  
  <div id="userSetting">
    <header>
        <h1>Gestion de compte</h1>
        <span id="rightHeader">
          <button class="colorSecondaire" @click="$router.push('/')">Accueil</button>
        </span>
    </header> 
    <UpdateProfil />
    <Salles />

    <div id="deleteAccount">
      <b  >Suprimer votre compte</b>
    </div>

  </div>
</template>

<script>

import Salles from './Settings/ListSalle.vue'
import UpdateProfil from './Settings/updateProfil.vue'

export default {
  name: 'UserProfils',
  data() {
    return {

    }
  },

  components: {
    Salles,
    UpdateProfil
  },


}
</script>

<style scoped>

  #deleteAccount{
    height:60px;
  }

  b {
    padding: 10px;
    float:none;
    margin-left:10%;
    cursor: pointer;
  } 

</style>