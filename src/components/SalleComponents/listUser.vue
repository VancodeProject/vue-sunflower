<template>
  <div id="listUsers"> 
    <h3>{{title}}<span id="number">({{users.length}})</span></h3>
    <ul>
      <li v-for="(user) in users" :key="user.id">
        <User :user="user" />
      </li>
    </ul>
  </div>
</template>

<script>

import User from './user';
export default {
  props: ["title","users"],
  data() {
    return{
    }
  },
  components:{
      User
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