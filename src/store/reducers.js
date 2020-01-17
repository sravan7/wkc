import {fromJS, Map as ImmutableMap, toJS} from "immutable";

// const initialState  = fromJS( {
//     userData:{}
// })

const initialState = fromJS({
    "userData":{},
    "val":0
 });
 console.log(initialState)
 
function storage (state=initialState, action){
    // state = fromJS(state);
    console.log(action);
    switch (action.type){
        case "incr":
            console.log(state)
            console.log(state.get("val"))
         return state.set("val", 1)
        case "get" :
            console.log(action.data)
        return state
        case "login":
            console.log(action.data)
            localStorage.setItem("accessToken", action.data.data.access_token)
                state = state.set("userData", fromJS(action.data.data));
                // return state.setIn(['userData'], "dfsd")
            return state;
        case "logout":
            return state;
        case "signouts":
            
        return state;
        default :
            console.log("action has missed for ", action);
            return state;
        
    }
}
export default storage;