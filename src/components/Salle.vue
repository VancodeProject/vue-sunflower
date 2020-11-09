<template>
    <div>
    <header>
        <h1>{{nameRoom}}</h1>
        <span id="rightHeader">
          <button class="colorSecondaire" @click="$router.push('/')">Accueil</button>
        </span>

    </header> 
    <div id="room">
        <div id="codeZone"><textarea></textarea></div>
         <ListUser/>
    </div>
  </div>
    
</template>

<script>
import ListUser from './SalleComponents/listUser'
export default {
  data() {
    return{
        nameRoom:"Programmation en C "
    }
  },
  components:{
      ListUser
  }
};

</script>