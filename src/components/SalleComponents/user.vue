<template>
  <div id="userItem">
      <div id="userInfo">
        <span class="avatar">{{user.name.substring(0, 2)}}</span>
        <h4>{{user.name}}</h4>
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
    width: 80%;
  }

  h4{
    overflow: hidden;
  }

  .fa-ban:hover{
    color:var(--redColor);
  }

</style>