<template>
    <form v-on:submit.prevent="createRoom">
        <h2>Information Salle</h2>

        <p> 
          Une fois ta salle crée tu pourras trouver une sauvegarde de celle ci dans ton espace de compte!
        </p>

        <label for="nameRoom"><b class="errorMessage" v-if="errorForm">L'intitulé doit avoir entre 1 et 32 caractères</b>Intitulé</label>
        <input v-if="errorForm" type="text" class="errorInput" name="nameRoom" id="nameRoom" v-model="nameRoom" :placeholder="'Programmation en '+selected.value"/>
        <input v-else type="text" class="validInput" name="nameRoom" id="nameRoom" v-model="nameRoom" :placeholder="'Programmation en '+selected.value"/>
       
        <label for="chooseLangage">Langage</label>

        <CustomSelect
          :options="languages"
          :default="selected"
          v-on:selectchange="changeInput($event)"
        />
     
        <button class="colorSecondaire">Créer une salle (2/2)</button>
      
    </form>
</template>

<script>
import CustomSelect from './SelectInput.vue'
export default {
  data() {
    return {
        nameRoom: "",
        selected: { id:1,value: 'C' },
        languages: [
          { id:1,value: 'C' },
          { id:2,value: 'C++' },
          { id:3,value: 'Python' },
          { id:4,value: 'Java' }
        ],
        errorForm:false,
    };
  },

  methods:{
    createRoom(){
      if(this.nameRoom.length<1 || this.nameRoom.length>64){
        this.errorForm=true;
      }else{
        this.$router.push('salle');
      }
    },
    changeInput(selected){
      this.selected = selected;
    }
  },

  watch:{
    nameRoom() {
       this.errorForm=false;
    },
  },

  components: {
    CustomSelect,
  },

  
};
</script>

<style scoped>
  button{
    margin-top: 7%;
  }
</style>