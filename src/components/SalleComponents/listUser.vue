<template>
  <div id="listUsers"> 
    <h3>{{title}}<span id="number">({{users.length}})</span></h3>
    <ul>
      <li v-for="(user) in users" :key="user.id" @click="emitUser(user.id)">
        <User :user="user"/>
      </li>
    </ul>
  </div>
</template>

<script>

import User from './user';
export default {
  props: ["title","users","editable", "listId"],
  data() {
    return{
    }
  },
  
  components:{
      User
  },

  methods:{
    emitUser(id) {
      if(this.editable){
        this.$emit('send-user', id, this.listId);
      }
    }
  }
};
</script>

<style lang="css" scoped>
  ul{
    list-style: none;
  }
  li{
    padding:6px 12px;
    margin-bottom:1.5%;
    background-color:var(--secondaryColor);
    border-radius:6px;
  }

  #number{
    margin-left: 2%;
  }

</style>