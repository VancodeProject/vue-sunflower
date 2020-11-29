<template>
  <div id="listUsers"> 
    <h3>Listes des participants <span id="number">({{users.length}})</span></h3>
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
  data() {
    return{
        users:[
            {id:1,name:"Alexandre"},
            {id:2,name:"Thomas"},
            {id:3,name:"Thomas"},
            {id:4,name:"Vancode"},
            {id:5,name:"Hercule"},
            {id:6,name:"Thomas"},
            {id:7,name:"Vancode"},
            {id:8,name:"Hercule"},
            {id:9,name:"Vancode"},
            {id:10,name:"Hercule"},
            {id:11,name:"Hercule"}
        ]
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
    max-height: 75vh;
    overflow-y: auto;
  }
  li{
    padding:6px 12px;
    margin-top:1.5%;
    background-color:var(--secondaryColor);
    border-radius:6px;
  }

  #number{
    margin-left: 2%;

  }

</style>