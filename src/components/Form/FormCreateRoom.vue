<template>
    <form v-on:submit.prevent="createRoom">
        <h2>Information Salle</h2>

        <p> 
          Une fois ta salle crée tu pourras trouver une sauvegarde de celle ci dans ton espace de compte!
        </p>

        <label for="nameRoom"><b class="errorMessage" v-if="errorForm">L'intitulé doit avoir entre 1 et 32 caractères</b>Intitulé</label>
        <input v-if="errorForm" type="text" class="errorInput" name="nameRoom" id="nameRoom" v-model="nameRoom" :placeholder="'Programmation en '+selected"/>
        <input v-else type="text" class="validInput" name="nameRoom" id="nameRoom" v-model="nameRoom" :placeholder="'Programmation en '+selected"/>
       
        <label for="chooseLangage">Langage</label>
        <select name="chooseLangage" class="validInput" v-model="selected">
            <option v-for="langage in languages" v-bind:key="langage.value">
              {{ langage.value }}
            </option>
        </select>
        

        <button class="colorSecondaire">Créer une salle (2/2)</button>
      
    </form>
</template>

<script>

export default {
  data() {
    return {
        nameRoom: "",
        selected: 'C',
        languages: [
          { value: 'C' },
          { value: 'C++' },
          { value: 'Python' },
          { value: 'Java' }
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
    }
  },

  watch:{
    nameRoom() {
       this.errorForm=false;
    },
  },

  
};
</script>

<style scoped>
  button{
    margin-top: 7%;
  }
</style>