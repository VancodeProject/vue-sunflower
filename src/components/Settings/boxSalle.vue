<template>
  <div id="boxSalle">
    <textarea spellcheck="false" type="text" :value=" salle.name" ></textarea>
    <div id="menuBox">
      <li ><i class="fa fa-play" aria-hidden="true"></i></li>
        <li ><i class="fa fa-download" aria-hidden="true"></i></li>
      <li @click="remove"><i class="fa fa-trash-o" aria-hidden="true"></i></li>
    </div>

    <div id="bottomBox">
      <p>Nombre participant : {{ salle.nbParticiapnt }}</p>
      <p>Datte : {{ salle.date }} </p>
      <p>Durée : {{ salle.duree }} min</p>
      <p>Langage : {{ salle.langage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["salle"],
  data() {
    return{}
  },
  methods:{
    remove(){
      this.$parent.$parent.remove(this.salle);
    }
  }
};
</script>

<style scoped>

  #menuBox{
    position: absolute;
    top: 10px;
    right: 10px;
  }

  #boxSalle:hover li{
    display:block;
  }

  #bottomBox {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  li{
    display:none;
    font-size: 20px;

    font-weight: 900;
  }

  li:hover{
    color:var(--greyColor);
  }

  p{
    color:white;
  }

  textarea {
    -webkit-appearance:none;
    -moz-appearance:none;
    -ms-appearance:none;
    -o-appearance:none;
    appearance:none;
    border:none;
    background: transparent;
    color:white;
    resize: none;
    width: 85%;
    
    font-size: 16px;
    font-family: 'Barlow', sans-serif;
    font-weight: 100;
    cursor:text;
  }

</style>