function checkUserName(value){
    if(value.length>3){
        return false;
    }
    return true;
}

function checkEmail(value){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
        return false
    }
    return true
}

function checkPassword(value){
    if (value.length > 6) {
        return false;
    }
    return true;
}

export {checkUserName};
export {checkEmail};
export {checkPassword};