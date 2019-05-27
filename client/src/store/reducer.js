const initialState={
        logInState:false,
        username:null,
        allUsers:[],
        id:null
}

/* var setupWebsocketConnection=function(data){
    if(initialState.connection){
        initialState.connection.close(initialState.username);
        //return;
    }
    initialState.connection=new WebSocket('ws://127.0.0.1:8081/echo');
    initialState.connection.onopen =  (msg)=> {
        // this.connection is opened and ready to use;
        initialState.connection.send(JSON.stringify(data));
        //console.log(msg)
    };

    initialState.connection.onerror = function (error) {
        // an error occurred when sending/receiving data
        console.log(error)
    };

    initialState.connection.onmessage = function (message) {
        // try to decode json (I assume that each message
        // from server is json)
        try {
            console.log(message.data)
        var json = JSON.parse(message.data);
        } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ',
            message.data);
        return;
        }
        // handle incoming message
        console.log(json)
    };
} */

const reducer=(state=initialState,action)=>{
    if(action.type==="FETCH_USER"){
        //setupWebsocketConnection(action.value);
        sessionStorage["myChatbotLoggedinUserName"]=action.loginDetails.username;
        sessionStorage["myChatbotLoggedinPassword"]=action.loginDetails.password;
        sessionStorage["myChatbotLoggedinType"]="signin";
        return {
            ...state,
            logInState:action.value.logInState,
            username:action.value.username,
            id:action.value.id
        }
    }
    if(action.type==="FETCH_ALLUSERS"){
        return{
            ...state,
            allUsers:action.value
        }
    }
    if(action.type==="FETCH_FILTERED_USER"){
        console.log(action.value)
        return{
            ...state,
            filteredUsers:action.value
        }
    }
    return{...state}
}
export default reducer;