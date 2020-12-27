<template>
    <div  v-if="show" id="popUp">
      <div id="popUpContent" ref="popUpContent">
          <div id="title" :style="{'background-color': content.codeZone.color }">
              <h1>{{content.codeZone.title}}</h1>
              <i class="fas fa-times" v-on:click="setShow(false,null)" aria-hidden="true"></i>
          </div>
    
          <br>
          <div id = "users">
            <div class="usersZone">
              <ListUser title="Codeurs déjà selectionnée"  :users="content.listUserSelected"/>
            </div>

            <div id="separator"></div>

            <div class="usersZone">
              <ListUser title="Autres utilisateurs"  :users="content.listUser"/>
            </div>
          </div>
      </div>
    </div>
</template>

<script>

 import ListUser from '../SalleComponents/listUser.vue';
  export default {
    data () {
      return {
        show:false,
        content : null
      }
    },
    components:{
      ListUser
    },

    methods:{
      setShow(value, content){
        this.show = value;

        value? this.setContent(content):this.setContent(null);
      },

    setContent(content){
        this.content = content;
      }
    },

    test(){
      alert("hihi");
      this.stopPropagation();
    }
  }
</script>
