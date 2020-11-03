<template>
  <div id="app">
    <transition name="fade" mode="out-in"><router-view/></transition>
  </div>
</template>

<script>
import themeChanger from './assets/js/theme.js';
export default {
   name: 'app',
   created() {
    this.themeChanger = new themeChanger();

    if(localStorage.themeValue!="true"){
       this.themeChanger._addDarkTheme();
    }
   
  },
}
</script>

