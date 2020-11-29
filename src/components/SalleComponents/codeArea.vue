<template>
    <div id="codeArea">
        <div v-for="(row) in rows" :key="row.number">
            <Row :ref="row.number" v-on="handlers" :rowInfos="row" />
        </div>
       
     </div>    
</template>

<script>
import Row from './row.vue'
export default {
  data(){
      return{
        rows:[],
        handlers:{
            newRowInfos:this.addRow,
            changeFocus:this.changeFocus,
            deleteRow:this.deleteRow,
            changeCursor:this.changeCursor,
        },
        currentTextArea:{},
      }
  },

  created(){
      this.createRows(1);
  },

  components:{
      Row
  },
  
  methods:{
    addRow(data){
        let tempRows = this.rows.filter((el)=>el.number>=data.number).map((el)=>{
            return  {
                number:el.number+1,
                value:el.value
            }
        })
         
        const fixedRows = this.rows.filter((el)=>el.number<data.number);

        fixedRows.push(data);
        this.rows = [...fixedRows,...tempRows];
    },

    deleteRow(data){
        this.rows[data.number-2].value += data.value;

        let tempRows = this.rows.filter((el)=>el.number>data.number).map((el)=>{
            return  {
                number:el.number-1,
                value:el.value
            }
        })
        const fixedRows = this.rows.filter((el)=>el.number<data.number);
        this.rows = [...fixedRows,...tempRows];
     
    },

    changeFocus(numberRow){
        const textArea = this.$children[numberRow];
        if(textArea){
            this.currentTextArea=textArea.$refs["rowArea"];
            this.currentTextArea.focus();
        }
    },

    createRows(number){
        for (let i = 1; i < number+1; i++) {
            this.rows.push({number:i,value:""});
        }
    },

    changeCursor(value){
        const cursorPos = value< this.currentTextArea.value.length ? value : this.currentTextArea.value.length;
        this.currentTextArea.selectionStart=cursorPos; 
        this.currentTextArea.selectionEnd=cursorPos;   
    }  
   
  }
};

</script>