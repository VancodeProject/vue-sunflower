<template>
<div>
  <div id="listroom">
    <h2>
      - Anciennes salles de codes simultanées
      <p>Que de souvenir, voila vos anciennes salles de code simultanées ! Relancez vos anciennes salles , ou alors télécharger les pour revivre vos belles expériences avec Vancode!</p>

      <span id="zoneButton"  v-if="room.length>0">
       <button @click="removeAll" class="colorRed">Supprimer toutes les salles</button>
       <button class="grey" @click="filteredItems"> <i class="fa fa-filter"></i> Trier </button>
      </span>
    
    </h2>

    <ul v-if="room.length>0">
       <transition-group name="list" tag="p">
          <li v-for="(room) in room" :key="room.id">
                <BoxSalle :room="room" />
          </li>
        </transition-group>
        
    </ul>
    <span id="messageInfo" v-else>
      Vous n'avez aucune salle sauvegardé
    </span>
  </div>
 
   </div>
</template>

<script>
import BoxSalle from "./boxSalle.vue";

export default {

  data() {
    return {
      room: [
        {id:"1",name: "Programmation en C", duree: "110", date:"12/12/2012", langage: "C" , nbParticiapnt:"12"},
        {id:"2",name: "Cours L3 info", duree: "120",  date:"12/12/2012", langage: "Python",nbParticiapnt:"12" },
        {id:"3",name: "Bientot reconfiné", duree: "140",  date:"12/12/2012", langage: "C++",nbParticiapnt:"12" },
        {id:"4",name: "Le meilleur patissier", duree: "60",  date:"12/12/2012", langage: "Java",nbParticiapnt:"12" },
        {id:"5",name: "Programmation en Python", duree: "110",  date:"12/12/2012",langage: "Python",nbParticiapnt:"12" },
        {id:"6",name: "Cours Java", duree: "120", date:"12/12/2012", langage: "Java",nbParticiapnt:"12" },
        {id:"7",name: "Cours C++", duree: "130", date:"12/12/2012", langage: "C++",nbParticiapnt:"12" },
        {id:"8",name: "Un jour...", duree: "20", date:"12/12/2012", langage: "C",nbParticiapnt:"12" },

      ],
    };
  },
  methods: {
    filteredItems() {
    },

    removeAll(){

      this.room=[];
    },

    remove (object) {

      let index = this.room.indexOf(object)
      this.room.splice(index, 1)
    },
  },

  components: {
    BoxSalle,
  },
};
</script>

<style scoped>

ul{
  overflow: hidden;
 list-style: none;
}

p {
  font-size:15px;
}

#zoneButton{
  display: flex; justify-content: flex-end; align-items: center;
  margin-bottom: 1% ;
}

#infoProfil{
  width: 100%;
}

h2{
  width: 100%;
}
</style>