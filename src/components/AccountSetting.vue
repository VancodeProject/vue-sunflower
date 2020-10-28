<template>
  
  <div id="userSetting">
    <header>
        <h1>Gestion de compte</h1>
        <span id="rightHeader">
          <button class="colorSecondaire" @click="$router.go(-1)">Accueil</button>
        </span>
    </header> 
    <div id="infoProfil">
        <h2>- Informations personnels</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend diam eu interdum iaculis. Curabitur eu velit a turpis malesuada pretium. Phasellus lacus purus, aliquet iaculis velit nec, interdum aliquam mi. </p>
    </div>
    <Salles />
    <!--  -->
  </div>
</template>

<script>

import Salles from './Settings/ListSalle.vue'


export default {
  name: 'UserProfils',
  data() {
    return {

    }
  },

  components: {
    Salles
  },
  
}
</script>

<style scoped>

  p {
    font-size:15px;
  } 

</style>