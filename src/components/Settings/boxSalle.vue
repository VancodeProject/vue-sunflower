<template>
  <span id="boxroom">
    <textarea spellcheck="false" type="text" :value=" room.title" ></textarea>
    <div id="menuBox">
      <li ><i class="fa fa-play" aria-hidden="true"></i></li>
        <li ><i class="fa fa-download" aria-hidden="true"></i></li>
      <li @click="remove"><i class="fa fa-trash-o" aria-hidden="true"></i></li>
    </div>

    <div id="bottomBox">
      <p>Nombre participant : {{ room.max_users }}</p>
      <p>Derniere modification : {{ room.date_last_change }} </p>
      <p>Durée : {{ room.timer }}</p>
      <p>Langage : {{ room.name }}</p>
    </div>
  </span>
</template>

<script>
export default {
  props: ["room"],
  methods:{
    remove(){
      this.$parent.$parent.remove(this.room);
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

  #boxroom:hover li{
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
    font-size: 12px;
  }

  textarea {
    color:white;
    width: 85%;
    font-size: 16px;
    font-family: 'Barlow', sans-serif;
    font-weight: 100;
    
  }

</style>