<template>
  <div class="select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected.value }}
    </div>

    <div class="items" :class="{ selectHide: !open }">
        <div v-for="option in options" :key="option.value" 
        @click="selected = option;
        open = false;$emit('selectchange', option);
        ">
            {{ option.value }}
        </div>
    
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  /*mounted() {
    this.$emit("selectchange", this.selected);
  }, Inutile pour l'instant*/ 
};
</script>

<style scoped>
.select {
  position: relative;
  width: 100%;
  text-align: left;
}

.select .selected {
  border-radius: 6px;
  border: 2px solid var(--greyColor);
  background-color: #F0F0F0;
  color: black;
  outline: none;
  cursor: pointer;
  user-select: none;
  padding:2% ;
  padding-top: 1%;
  padding-bottom:1%;
  font-size: 15px;
  font-weight: 500;  
  text-rendering: optimizeLegibility;
}

.select .selected.open {
  border-color:var(--primaryColor);
  border-radius: 6px 6px 0px 0px;
  background-color:white ;
}

.select .selected:after {
  position: absolute;
  content: "";
  top: 45%;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: black transparent transparent transparent;
}

.select .items {
  border:2px solid var(--primaryColor);
  
  border-top:none;
  border-radius: 0px 0px 6px 6px;
  color:black;
  position: absolute;
  background-color: #F0F0F0;
  left: 0;
  right: 0;
  z-index: 5;
}

.select .items div {
    cursor: pointer;
    user-select: none;
    font-size: 15px;
    font-weight: 500;
    padding-top:0.5%;
    padding-bottom:0.5%;
    padding-left: 2%;
}

.select .items div:hover {
  background-color:rgb(73, 73, 73);
  color:white;
}

.selectHide {
  display: none;
}
</style>