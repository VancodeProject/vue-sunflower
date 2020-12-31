<template>
    <div id="room">
        <PopUp ref="popUp" @move-user="popUpEvent"/>
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
          
            <ListUser title="Listes des participants" :users="listUser" :editable="false" :listId="0"/>
        </div>
        <div id="codeZone" >
            <div id="codeBox" v-for="(codeZone) in codeZones" :key="codeZone.id">
                <div id="enteteCodeBox">
                    <div spellcheck="false" ref="titleCodeBox" contentEditable="true" @keydown.enter.exact.prevent :data-index="codeZone.id" v-on:blur="changeTitle" :style="{'background-color': codeZone.color }" id="titleCodeZone">
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
                            <i v-if="codeZone.position>1" v-on:click="switchCodeZone((Number(codeZone.position)-2),(Number(codeZone.position)-1))" class="fa fa-arrow-up" aria-hidden="true"></i>
                            <i v-else class="fa fa-arrow-up disable"  aria-hidden="true"></i>                        
                        </span>

                        <span>
                            <i v-if="codeZone.position<codeZones.length" v-on:click="switchCodeZone(codeZone.position,(Number(codeZone.position)-1))" class="fa fa-arrow-down"  aria-hidden="true"></i>
                            <i v-else class="fa fa-arrow-down disable"  aria-hidden="true"></i>
                        </span>
                    
                        <span v-if="admin">
                            <i class="fa fa-close" v-on:click="removeCodeZone((Number(codeZone.position)-1), true)" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                
                <CodeArea :codeZone="codeZone" @input="updateCodeArea"/>
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

            // On initialise le WebSocket a null
            ws: null,

            admin : true,
        }
    },
    
    components:{
        ListUser,
        CodeArea,
        PopUp
    },

    mounted() {
        // Commencer la connexion WebSocket avec le serveur
        this.ws = new WebSocket('ws://localhost:3000', 'code-simu')
        this.ws.onerror = () => {
            // TODO: Rendre ca plus joli si le temps
            alert("Probleme de connexion avec le serveur. Redirection vers l'accueil.");
            // Si on ne peut connecter on redirige l'utilisateur vers la page de connexion
            window.location = "/";
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            /*
                STR = STaRt (les donnees de debut (si on arrive en cours de session))
                TXT = TEXT
                ACZ = Add Code Zone (Ajout et Fusion)
                DCZ = Delete Code Zone
                UCZ = Update Code Zone (titre)
                MUL = Modify User List
            */
            switch (data.type) {
                case "STR": {
                    break;
                }

                case "TXT": {
                    let zone = this.codeZones.find( (zone) => zone.id === data.id);
                    zone.content = data.content;
                    break;
                }

                case "ACZ":
                    this.codeZones.push(data.zone);
                    break;

                case "DCZ": {
                    const position = this.codeZones.find((zone) => zone.id === data.id).position;
                    this.removeCodeZone(parseInt(position) - 1, false);
                    break;
                }
                
                case "UCZ":
                    this.codeZones[data.index].title = data.title;
                    break;

                case "AUL":
                    this.addUserOnCodeZone(data.idCode, data.idUser)
                    break;
                
                case "DUL":
                    this.removeUserOnCodeZone(data.idCode, data.idUser)
                    break;
            }
        };
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

            this.codeZones.splice(newPosition, 1,oldTemps);
            this.codeZones.splice(oldPosition, 1,newTemps);

            this.$forceUpdate();
        },
        
        removeCodeZone(position, shouldWSCall){
            const suppressed = this.codeZones.splice(position, 1)[0];

            let compteur = 1;

            this.codeZones.forEach(codeZone => {
                codeZone.position = compteur;
                compteur++;
            });

            if (shouldWSCall) 
                this.sendWSMessage("DCZ", {
                    id: suppressed.id,
                });
        },

        setVisible(id, value){
            this.codeZones[id].visible = value;
        },

        addCodeZone(event,content){
            if(content == null) content = [""];

            let color = this.colorsForZone[this.codeZones.length%this.colorsForZone.length]
            const newid = this.findIdToCreate();
            let codeZone = {id:newid,position:Number(this.codeZones.length)+1, title : "titre "+newid,content: content, color: color, userId :[], visible : true};
            this.codeZones.push(codeZone);
            // On envoie une requete pour creer une nouvelle code zone a tous les utilisateurs
            this.sendWSMessage("ACZ", {
                zone: codeZone
            });
        },

        //TODO : Reussir a bien split dans les tableaux
        updateCodeArea(id, value){
            if(id && value){
                const newValue = value.split('\n').filter(line => line !== "");
                this.codeZones[this.findIdWithId(id,this.codeZones)].content = newValue;
                // On envoie une requete WebSocket pour dire aux autres utilisateurs de modifier leur codeZone
                // TODO: Trouver le soucis avec la mise a jour de la codeZone
                this.sendWSMessage("TXT", {
                    id: id,
                    content: newValue,
                });
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

        changeTitle: function(e){
            let index = this.findIdWithId(e.target.dataset.index, this.codeZones);
            this.codeZones[index].title = e.target.innerHTML;

            this.sendWSMessage("UCZ", {
                index: index,
                title: e.target.innerHTML
            });
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
        },

        findIdWithId(id, arrayToFind){
            for(let i = 0; i < arrayToFind.length; i++){
                if(arrayToFind[i].id == id) return i;
            }

            return -1;
        },

        findIndexWithIdUserCode(idUser, codeZoneId){
            for(let i = 0; i < this.codeZones[codeZoneId].userId.length; i++){
                if(this.codeZones[codeZoneId].userId[i] == idUser) return i;
            }
        },

        findIdToCreate(){
            let maxid=0;
            for(let i = 0; i < this.codeZones.length; i++){
                if(this.codeZones[i].id > maxid) maxid = this.codeZones[i].id
            }
            return Number(maxid)+1;
        },

        popUpEvent(idCodeZone,idUser,add){
            if (add)
                this.addUserOnCodeZone(idCodeZone,idUser)
            else
                this.removeUserOnCodeZone(idCodeZone,idUser)
            
            this.sendWSMessage(
                add ? "AUL" : "DUL",
                {
                    idCode: idCodeZone,
                    idUser: idUser
                }
            )
           
        },

        addUserOnCodeZone(idCodeZone,idUser){
            let index = this.findIdWithId(idCodeZone,this.codeZones);
            let indexUser =  this.findIdWithId(idUser,this.listUser);
            this.codeZones[index].userId.push(this.listUser[indexUser].id);

            console.log("J'ajoute : "+this.listUser[indexUser].name);
            console.log(this.codeZones[index].userId);
        },

        removeUserOnCodeZone(idCodeZone,idUser){
            let index = this.findIdWithId(idCodeZone,this.codeZones);
            let indexUser=  this.findIndexWithIdUserCode(idUser,index)
            this.codeZones[index].userId.splice(indexUser,1);
        },

        sendWSMessage(eventType, message) {
            // On envoie la fusion entre le type de message et le message donne
            // Pour se faire on utilise le spread operator (...)
            // On a choisit d'utiliser cettre approche a la place de mettre le type
            // directement dans le message de base afin de rendre le type de message plus clair
            this.ws.send(JSON.stringify({
                type: eventType,
                ...message
            }))
        }

    }
  
};

</script>

