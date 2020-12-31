<template>
    <div id="codeArea">
        <div id="lineNumber" ref="numberLine" :style="{ 'background-color': codeZone.color }">
          
        </div>
        <div id="textCode" v-on:keyup="keyPressed" spellcheck="false" :contentEditable="editable" ref="textCode">
            
        </div>
        <div :style="{ height: height + 'px', 'background-color': codeZone.color }" v-if="!this.codeZone.visible" ref="cache" id="cache"></div>
        
        <!--<div v-for="(row) in rows" :key="row.number">
            <Row :ref="row.number" v-on="handlers" :rowInfos="row" />
        </div>-->

    </div>    
</template>

<script>
//import Row from './row.vue'
export default {

    props: ["codeZone","editable"],

    data(){
        return{
            numberLine : 1,
            oneLineHeight : 0.0,
            height : 0,
        }
    },

    mounted: function () {

        var ce = this.$refs.textCode;
        ce.addEventListener('paste', function (e) {
            e.preventDefault()
            var text = e.clipboardData.getData('text/plain')
            document.execCommand('insertText', false, text)
        });

        ce.addEventListener('keydown', function () {
            if (event.keyCode == 9) {
                event.preventDefault();
                document.execCommand('insertText', false, "\t")
            }

        });

        this.codeZone.content.forEach(ligneText => {
            this.$refs.textCode.innerHTML+=ligneText+" </br>"
        });

        // On recupere la taille d'une ligne
        this.oneLineHeight = this.getSizeTextCode() / (this.codeZone.content.length);

        this.checkNumberLine();
    },

    methods:{
        keyPressed: function(event) {
            if(event.key == "Enter" || event.key == "Backspace" || event.keyCode == 88 && event.ctrlKey)
                this.checkNumberLine();
      
            this.$emit("input", this.codeZone.id, this.$refs.textCode.innerText);
        },

        changeText:function(content){
            this.$refs.textCode.innerHTML="";
            content.forEach(ligneText => {
                this.$refs.textCode.innerHTML+=ligneText+" </br>"
            });

            this.checkNumberLine();
        },

        getSizeTextCode(){
            var value = window.getComputedStyle(this.$refs.textCode).height;
            return value.substring(0, value.length - 2)
        },

        checkNumberLine(){
                var currentHeight = this.getSizeTextCode();
                if(currentHeight != this.oneLineHeight){
                    this.numberLine = currentHeight/this.oneLineHeight;
                }else{
                    this.numberLine = 1;
                }

                this.displayLineNumber();
        },

        displayLineNumber(){
            var numberLine = this.$refs.numberLine;
            numberLine.innerHTML = "";
            for (let i = 1; i < this.numberLine+1; i++) {
                numberLine.innerHTML+=('<span>'+i+'</span>')
            }
            
            this.height = (this.numberLine)*this.oneLineHeight;
        }
    }
};

</script>