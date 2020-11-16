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


async function updateInfoUser(user){
    let rep;
    await axios({url: 'http://localhost:3000/api/user/account',data:user, method: 'PATH' })
    .then(resp => {
        rep=[{error:"false",resp:resp.data}]
    })
    .catch(err => {
        rep=[{error:"false",resp:err}]
        console.log(err);
    })

    return rep;
}

export{getInfoUser};
export{updateInfoUser};