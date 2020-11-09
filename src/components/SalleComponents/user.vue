<template>
  <div id="userItem">
      <h4>{{user.name}}</h4>
      <i class="fa fa-ellipsis-h"></i>
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