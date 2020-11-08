<template>
  <div id="Register">
    <header>
      
        <h1>VanCode</h1>
        <span id="rightHeader">
          <button class="colorSecondaire" @click="$router.push('/')">Accueil</button>
          <Theme/>
        </span>

    </header> 
    <section id="formSection">
        <FormRegister /> 
    </section>
    <div id ="backgroundRegister"></div>
  </div>
</template>

<script>

import FormRegister from './Form/FormRegister.vue'
import Theme from './ThemeChanger.vue'

export default {
  name: 'Register',
  data() {
    return {
    }
  },

  components: {
    FormRegister,
    Theme
  },
  
}
</script>

