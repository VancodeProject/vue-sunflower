<template>
    <div>
    <header>
        <h1>{{nameRoom}}</h1>
        <span id="rightHeader">
          <button class="colorSecondaire" @click="$router.push('/')">Accueil</button>
        </span>

    </header> 
    <div id="room">
        <div id="codeZone">
            <CodeArea />
        </div>
       
    </div>
  </div>
    
</template>

<script>
import CodeArea from './SalleComponents/codeArea.vue'
export default {
  data() {
    return{
        nameRoom:"Programmation en C "
    }
  },
  components:{
      CodeArea
  }
};

</script>