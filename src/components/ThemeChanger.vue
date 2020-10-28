<template>
    <span v-if="themeValue" @click="darkThemeSwitch" id="circle"></span>
    <span  v-else @click="darkThemeSwitch" id="circle" class="colorDark"></span>
   
</template>

<script>
import themeChanger from '../assets/js/theme.js';

export default {
  name: 'Theme',
  data() {
    return {
      themeValue:localStorage.themeValue=="true",
      themeChanger: null,
    };
  },
  methods: {
    darkThemeSwitch() {
      this.themeChanger.darkThemeSwitch();
      this.themeValue = !this.themeValue;
      localStorage.themeValue =this.themeValue;

    },
  },
  created() {
    this.themeChanger = new themeChanger();

    if(localStorage.themeValue!="true"){
       this.themeChanger._addDarkTheme();
    }
   
  },
};
</script>

<style scoped>
  p{ 
    z-index: 2;
    color:black;
  }

  p:hover{
    cursor: pointer;
  }
</style>