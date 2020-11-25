<template>
    <div id="room">
        <div id="salleInfo">
            <h1>{{nameRoom}}</h1>
        </div>
        <div id="codeZone">
            <CodeArea />
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