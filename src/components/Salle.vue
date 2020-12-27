<template>
    <div id="room">
        <PopUp ref="popUp"/>
        <div id="salleInfo">
            <div id="salleButton">
                <button class="colorSecondaire" @click="$router.push('/')">Accueil</button>
                <button @click="closeRoom" class="colorRed">Fermer la salle</button>
            </div>
            <br>
            <h1>{{nameRoom}}</h1>
           
            <div v-if="admin">
                <h3>Actions</h3>

                <div id="salleButton">
                    <button class="colorSecondaire" @click="addCodeZone" >Ajout zone code</button>
                    <button class="colorSecondaire" @click="fusionCodeZone">Fussioner zone code</button>
                </div>
            </div>
           
            <br>
          
            <ListUser title="Listes des participants" :users="listUser" />
        </div>
        <div id="codeZone" >
            <div id="codeBox" v-for="(codeZone) in codeZones" :key="codeZone.id">
                <div id="enteteCodeBox">
                    <div spellcheck="false" ref="titleCodeBox" contentEditable="true" :data-index="codeZone.id" v-on:keyup="changeTitle" :style="{'background-color': codeZone.color }" id="titleCodeZone">
                    {{codeZone.title}}
                    </div>
                    <div id="infoCodeZone">
                        <span>
                            <i v-if="codeZone.visible" v-on:click="setVisible((Number(codeZone.position)-1),false)" class="fa fa-eye" aria-hidden="true"></i>
                            <i v-else class="fa fa-eye-slash" v-on:click="setVisible((Number(codeZone.position)-1),true)" aria-hidden="true"></i>
                        </span>

                        <span v-if="admin">
                            <i class="fas fa-user-edit" v-on:click="openPopUp(codeZone.position)" aria-hidden="true"></i>
                        </span>

                        <span>
                            <i v-if="codeZone.id>1" v-on:click="switchCodeZone((Number(codeZone.position)-2),(Number(codeZone.position)-1))" class="fa fa-arrow-up" aria-hidden="true"></i>
                            <i v-else class="fa fa-arrow-up disable"  aria-hidden="true"></i>                        
                        </span>

                        <span>
                            <i v-if="codeZone.id<codeZones.length" v-on:click="switchCodeZone(codeZone.position,(Number(codeZone.position)-1))" class="fa fa-arrow-down"  aria-hidden="true"></i>
                            <i v-else class="fa fa-arrow-down disable"  aria-hidden="true"></i>
                        </span>
                    
                        <span v-if="admin">
                            <i class="fa fa-close" v-on:click="removeCodeZone((Number(codeZone.position)-1))" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                
                <CodeArea  v-on:input="updateCodeArea()" :codeZone="codeZone" @input="updateCodeArea"/>
                <div id="infoCode">
                   <h6>Nombre de codeurs : {{codeZone.userId.length}}</h6> 
                </div>
            </div>
        </div>
     

    </div>
</template>

<script>
import CodeArea from './SalleComponents/codeArea.vue'
import ListUser from './SalleComponents/listUser.vue'
import PopUp from './utils/popUp.vue'

export default {
  data() {
        return{
            nameRoom:"Programmation en C",
            codeZones: [
                {id:"1", position:"1", title : "Exercice de programmation niveau debutant", content: ["Print ('Hello worl!')", " plusieurs ligne au chargement " ], color: "#583d72", userId :[1,2], visible : true},
            ],

            colorsForZone:['#583d72','#9f5f80','#ffba93','#DB7F67','#A37B73'],

            listUser : [
                {id:1,name:"Alexandre"},
                {id:2,name:"Thomas"},
                {id:3,name:"Pierre"},
                {id:4,name:"Vancode"},
                {id:5,name:"Hercule"},
                {id:6,name:"Jean"},
            ],

            admin : true,
        }
    },
    
    components:{
        ListUser,
        CodeArea,
        PopUp
    },

    methods:{
        closeRoom(){
            
        },
        
        getNameZone(id){
            var value = "";
            var separator = " "
                
            id.forEach(userId => {
                value+=this.listUser[userId].name+separator;
            });

            return value;
        },

        switchCodeZone(newPosition, oldPosition){
            let newTemps = { ...this.codeZones[newPosition] };
            let oldTemps =  { ...this.codeZones[oldPosition] };

            newTemps.position = oldTemps.position;

            oldTemps.position = this.codeZones[newPosition].position;

            this.codeZones .splice(newPosition, 1,oldTemps);
            this.codeZones .splice(oldPosition, 1,newTemps);

            this.$forceUpdate();
        },
        
        removeCodeZone(id){
            this.codeZones.splice(id, 1);

            let compteur = 1;

            this.codeZones.forEach(codeZone => {
                codeZone.position = compteur;
                compteur ++;
            });
        },

        setVisible(id, value){
            this.codeZones[id].visible = value;
        },

        addCodeZone(event,content){
            if(content == null) content =[""];

            let color = this.colorsForZone[this.codeZones.length%this.colorsForZone.length]
            let codeZone = {id:Number(this.codeZones.length)+1,position:Number(this.codeZones.length)+1, title : "titre "+(Number(this.codeZones.length)+1),content: content, color: color, userId :[], visible : true};
            this.codeZones.push(codeZone);
        },

        updateCodeArea(position, value){
            if(position && value){
                let newValue = value.split('\n');
                newValue = newValue.filter(line => line !== "");
                this.codeZones[Number(position)- 1].content = newValue;
            }
        },

        fusionCodeZone(){
            var myContent=[];
            this.codeZones.forEach(codeZone => {
                codeZone.content.forEach(text => {
                    myContent.push(text);
                });

            });

            this.addCodeZone(null,myContent);        
        },

        changeTitle: function(){
            /*let index = Number(e.target.getAttribute("data-index"))-1;
            this.codeZones[index].title = e.target.innerHTML;*/
        },

        openPopUp(position){
            var content;
            var codeZone = this.codeZones[(position-1)];
            var userSelect = this.getUserFormCodeZone(codeZone);
            var users = this.listUser;
            
            users = users.filter( function( el ) {
                return !userSelect.includes( el );
            } );

            content = {codeZone:codeZone, listUser:users, listUserSelected : userSelect},
            this.$refs.popUp.setShow(true,content);
        },

        getUserFormCodeZone(codeZone){
            var userSelect = [];
            codeZone.userId.forEach(userId => {
                this.listUser.forEach(user => {
                    if(user.id == userId)
                        userSelect.push(user);
                })

            });

            return userSelect;
        }
    }
  
};

</script>

