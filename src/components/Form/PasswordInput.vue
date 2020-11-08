<template>
    <div id="passwordShowHidden">
        <input :class=classInput :type="passwordType" v-model="password"  @input="sendDataParent ()">
        <button type="button" :class=classInput class="grey" v-if="passwordType=='password'" @click="switchVisibility"><i class="fa fa-eye"></i></button>
        <button type="button" :class=classInput class="grey" v-else  @click="switchVisibility"><i class="fa fa-eye-slash " ></i></button>
    </div>
</template>

<script>

export default {
  name: 'PasswordInput',
  props: ["classInput","inputReturn"],
  data() {
    return {
        password: '',
        passwordType: 'password',
    };
  },
  methods: {
    switchVisibility() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },

    sendDataParent () {
      this.$emit("sendDataParent", this);
    }
  }
};
</script>

<style scoped>

    #passwordShowHidden{
        width: 104.1%;    
        display: flex;
    }

    input{
        padding-right: 0;
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        width: 90%;
    }

   input:focus{
        border-right:0;
    }

    button{
        padding:0;  
        border:none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin: 0;
        width: 10%;
    }

</style>