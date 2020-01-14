
const intialState = {
    login: false,
    userData: {},
    items:{}, 
}

const storage = (state=intialState, action)=>{
    switch (action.type){
        case "login": 
            return state;
        case "logout":
            return state;
        default :
            console.log("action has missed for ", action);
            return state;
    }
}