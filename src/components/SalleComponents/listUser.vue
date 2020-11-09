<template>
  <div id="listUsers"> 
    <ul>
       <transition-group name="list" tag="p">
          <li v-for="(user) in users" :key="user.id">
                <User :user="user" />
          </li>
        </transition-group>
        
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
            {id:3,name:"Vancode"},
            {id:4,name:"Hercule"}
        ]
    }
  },
  components:{
      User
  }
};
</script>