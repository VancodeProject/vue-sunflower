<template>
  <div id="dropDown" @blur="open = false" 
        @mouseover="open = true"
        @mouseleave="open = false" >
        <div class="selected" :class="{ open: open }">
            <span v-if="changeName"> <i class="fa fa-filter"></i>  {{selected}} </span>
            <span v-else> <i class="fa fa-filter"></i> Trier</span>
        </div>

    <div class="items" :class="{ selectHide: !open }">
        <div v-for="option in options" :key="option" 
        @click="selected = option;
        open = false;$emit('dropdownchange', option);
        ">
             <span v-if="selected!=option">{{ option }}</span>
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

    changeName: {
      type: Boolean,
      required: false,
      default: null,
    },

  },
  data() {
    return {
        selected: this.options[0]
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

<style lang="css" scoped>
#dropDown{
    position: relative;
    min-width: 10%;
    text-align: center;
}

#dropDown .selected {
    border-radius: 6px;
    background-color: var(--greyColor);
    color: white;
    outline: none;
    cursor: pointer;
    padding: 6px;
    user-select: none;
    line-height: 1.6;
    font-size: 0.8rem;
    font-weight: 400;
    text-rendering: optimizeLegibility;
}

#dropDown .selected.open {
  border-color:var(--primaryColor);
  border-radius: 6px 6px 0px 0px;
  background-color:rgb(73, 73, 73) ;
}

#dropDown .items {
  border-radius: 0px 0px 6px 6px;
  color:black;
  position: absolute;
  background-color:var(--greyColor);
  overflow:visible;
  left: 0;
  right: 0;
  z-index: 5;
}
#dropDown .items div {
    display:table;
    width: 100%;
  
}
#dropDown .items div:last-child{
   border-radius: 0px 0px 6px 6px;
}

#dropDown .items div span {
    cursor: pointer;
    color:white;
    line-height: 1.6;
    font-size: 0.8rem;
    font-weight: 400;
    display:table-cell;
    vertical-align:middle;
    padding: 6px;   
    width: 100%;
 
}
#dropDown .items div:hover {
    background-color: rgb(73, 73, 73);
}

.selectHide {
  display: none;
}
</style>