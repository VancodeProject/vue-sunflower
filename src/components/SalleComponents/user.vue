<template>
  <div id="userItem">
      <div id="userInfo">
        <span id="name">
          <span class="avatar">{{user.name.substring(0, 2)}}</span>
          <h4>{{user.name}}</h4>
        </span>
       
        <h4 style="float:left" v-if="user.status == 'admin'"> admin </h4>
      </div>
  </div>
</template>

<script>
export default {
  props: ["user"],

  data() {
    return{}
  },
};
</script>

<style lang="css">

  #userInfo{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  #name{
    display: flex;
    align-items: center;
    width: 70%;
  }
  h4{
    overflow: hidden;
  }

  .fa-ban:hover{
    color:var(--redColor);
  }

</style>