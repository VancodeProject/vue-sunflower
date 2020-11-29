<template>
    <div class="row">

		<label class="number">{{rowInfos.number}}</label>
		<textarea  
            rows="1" 
            spellcheck="false"
            ref="rowArea" 
            @keydown.enter.exact.prevent="onEnter" 
            @keydown.delete="onDelete"
            @keydown.up.prevent="onUp"
            @keydown.down.prevent="onDown"
            @keydown.tab.prevent="onTab"
            class="area" 
            v-model="rowInfos.value">
        </textarea>
       
	</div>
</template>

<script>

export default {
    props:["rowInfos"],
    
    mounted(){
        this.updateSizeArea(this.rowInfos.value);
    },

    methods:{

        emit(event,data){
            return new Promise((resolve)=>{
                this.$emit(event,data);
                this.$nextTick(resolve);
            })
        },

        async onEnter () {
            let refTextearea = this.$refs["rowArea"];
            let valueNextRow = this.rowInfos.value.substr(refTextearea.selectionStart);
            let newRow = {number:this.rowInfos.number+1,value:valueNextRow};

            this.rowInfos.value= this.rowInfos.value.substr(0,refTextearea.selectionStart);
            await this.emit("newRowInfos", newRow);
            this.changeFocusAndCursor(this.rowInfos.number,true);
        },

        onDelete(e){
            let refTextearea = this.$refs["rowArea"];
            if(refTextearea.selectionStart==0 && this.rowInfos.number >1){
                this.changeFocusAndCursor(this.rowInfos.number-2);
                this.$emit("deleteRow", this.rowInfos);
                e.preventDefault();  
            }
        },

        changeFocusAndCursor(numberNewFocus,cursor){
            this.$emit("changeFocus",numberNewFocus);
            if(cursor)this.$emit("changeCursor",this.$refs["rowArea"].selectionStart);
        },

        onUp(){
            this.changeFocusAndCursor(this.rowInfos.number-2,true);
        },
        
        onDown(){
            this.changeFocusAndCursor(this.rowInfos.number,true);
        },

        onTab(){
            const pos = this.$refs['rowArea'].selectionStart;
            const value = this.rowInfos.value;
            this.rowInfos.value = [value.slice(0, pos), '\t', value.slice(pos)].join("")
            this.$refs["rowArea"].value=this.rowInfos.value;
            this.replaceCursor(pos);
        },

        replaceCursor(start){
            this.$refs['rowArea'].selectionStart =
            this.$refs['rowArea'].selectionEnd = start + 1;
        },
        
        
        updateSizeArea(newValue){
            this.$refs["rowArea"].value=newValue;
            this.$refs["rowArea"].style.height = 'auto'
            this.$refs["rowArea"].style.height=this.$refs["rowArea"].scrollHeight + 'px'
        }
    },
    
    watch:{
        rowInfos: {
        handler(newVal) {
           this.updateSizeArea(newVal.value)
        },
            deep: true,
        },
    }

    
};

</script>

<style lang="css">
    .row:focus-within >.number{
        color:white;
        background-color:var(--primaryColor);
    }

    
</style>

