<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
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

    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  },
}
</script>

