<template>
    <form method="POST">
        <h2>Information Salle</h2>

        <p> 
          Une fois ta salle crée tu pourras trouver une sauvegarde de celle ci dans ton espace de compte!
        </p>

        <label for="nameRoom">Intitulé</label>
        <input type="text" class="validInput" name="nameRoom" id="nameRoom" v-model="nameRoom" :placeholder="'Programmation en '+selected"/>
       
        <label for="chooseLangage">Langage</label>
        <select name="chooseLangage" class="validInput" v-model="selected">
            <option v-for="langage in langages" v-bind:key="langage.value">
              {{ langage.value }}
            </option>
        </select>
        
         <!--<p> 
          <br>
          Intitulé : {{ nameRoom }} <br> Langage : {{ selected }}
        </p>-->

        <button v-on:click="login()" class="colorSecondaire">Créer une salle (2/2)</button>
      
    </form>
</template>

<script>

export default {
  data() {
    return {
        nameRoom: "",
        selected: 'C',
        langages: [
          { value: 'C' },
          { value: 'C++' },
          { value: 'Python' },
          { value: 'Java' }
        ]
    };
  },
};
</script>

<style scoped>
  button{
    margin-top: 7%;
  }
</style>