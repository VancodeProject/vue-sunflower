import axios from 'axios'

async function getInfoUser(isLoggedIn){
    let user ="";
    if(isLoggedIn){
        await axios({url: 'http://localhost:3000/api/user/token_infos', method: 'GET' })
        .then(resp => {
            user = resp.data;
        })
        .catch(err => {
            console.log(err);
            this.$store.dispatch('logout');
        })
    }
    return user;
}

async function getRoom(isLoggedIn){
    let room ="";
    if(isLoggedIn){
        await axios({url: 'http://localhost:3000/api/user/rooms', method: 'GET' })
        .then(resp => {
            room = resp.data;
            console.log(room);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return room;
}

async function updateMDP(isLoggedIn,data){
    if(isLoggedIn){
        return new Promise((resolve, reject) => {
            axios({url: 'http://localhost:3000/api/user/account',data:data, method: 'PATCH' })
            .then(resp => {
                resolve(resp)
            })
            .catch(err => {
                reject(err)
            })
        });
    }
}

async function getSlang(data) {
    return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3000/api/room/slang', data:data, method: 'GET' })
        .then(resp => resolve(resp))
        .catch(err => reject(err))
    })
}

export{getRoom};
export{getInfoUser};
export{updateMDP};
export{getSlang};