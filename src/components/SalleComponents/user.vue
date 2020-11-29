<template>
  <div id="userItem">
      <div id="userInfo">
        <span class="avatar">{{user.name.substring(0, 2)}}</span>
              <h4>{{user.name}}</h4>
      </div>

      <div id="action">
        <i class="fa fa-ban"></i>
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

  #action {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20%;
    font-size: 13px;
  }

  h4{
    overflow: hidden;
  }

  .fa-ban:hover{
    color:var(--redColor);
  }

</style>