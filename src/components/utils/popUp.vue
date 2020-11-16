<template>
  <transition name="slide-notification">
    <div  v-if="show" id="notification">
      <i  v-if="show" class="fa fa-bell" ></i>{{content }}
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        show:false
      }
    },

    methods:{
        setShow(value){
            this.show = value;
            setTimeout(() => {   this.show = false; }, 3000);
        }
    }
  }
</script>
