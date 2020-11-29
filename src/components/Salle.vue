<template>
    <div id="room">
        <div id="salleInfo">
            <div id="salleButton">
                <button class="colorSecondaire" @click="$router.push('/')">Accueil</button>
                <button @click="removeAll" class="colorRed">Fermer la salle</button>
            </div>
            
            <h1>{{nameRoom}}</h1>

             <ListUser />
        </div>
        <div id="codeZone">
            <CodeArea />
        </div>
    </div>
</template>

<script>
import CodeArea from './SalleComponents/codeArea.vue'
import ListUser from './SalleComponents/listUser.vue'
export default {
  data() {
    return{
        nameRoom:"Programmation en C"
    }
  },
  components:{
      ListUser,
      CodeArea
  }
};

</script>

