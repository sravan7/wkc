import {fromJS, Map as ImmutableMap, toJS} from "immutable";

// const initialState  = fromJS( {
//     userData:{}
// })

const initialState = {
    "horseData":[],
    "userData":{},
    "val":0
 };
 console.log(initialState)
 
function storage (state=initialState, action){
    // state = fromJS(state);
    console.log(action);
    switch (action.type){
        case "incr":
            console.log(state)
            // console.log(state.get("val"))
         return state
        case "get" :
        //    state= state.setIn(["horseData", fromJS(action.data)])    
        // console.log(state.get("horseData").toJS())
        return Object.assign(state,{"horseData":action.data});
        case "put" :
            let newData =[...state.horseData];
            newData[action.index]=action.data
            return Object.assign(state,{"horseData":newData});
        case "delete" :
            let newArray =[...state.horseData];
            newArray.splice(action.index,1)
            console.log(newArray)
            return Object.assign(state,{"horseData":newArray});
            
        case "login":
            console.log(action.data)
            localStorage.setItem("accessToken", action.data.data.access_token)
                // state = state.set("userData", fromJS(action.data.data));
                // return state.setIn(['userData'], "dfsd")
            return Object.assign(state,{"userData":action.data.data});
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