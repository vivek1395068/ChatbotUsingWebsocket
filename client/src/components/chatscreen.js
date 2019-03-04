import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import HKloginPage from "./loginPage";
import {connect} from "react-redux";
import myImg from "../assets/img/myphoto.jpg";
import "../assets/css/stylesheet.css"

class ChatScreen extends React.Component{

    constructor(){
        super();
        // if user is running mozilla then use it's built-in WebSocket
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        this.state={
            selectedUser:"",
            targetUser:null,
            loggedInOnlineStatus:false,
            targetUserLoggedInStatus:false,
            chatObject:{},
            incomingChatObject:{}
        }
    }

    componentDidMount(){
        window.addEventListener("online",this.sendOnlineStatus.bind(this));
        window.addEventListener("offline",this.sendOnlineStatus.bind(this));
        this.props.fetchAllUsers();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id!==this.props.id){
            this.setupWebsocketConnection(JSON.stringify({type:"sendLoginId",id:nextProps.id,loggingInOnlineState:navigator.onLine}))
        }
        if(nextProps.username!=="unauthorized user" && nextProps.username){
            this.setState({
                loggedInOnlineStatus:navigator.onLine
            })
        }
    }

    setupWebsocketConnection(data){
        this.connection=new WebSocket('wss://'+window.location.host+'/echo');
        //this.connection=new WebSocket('ws://localhost:8081/echo');
        this.connection.onopen =  (msg)=> {
            // this.connection is opened and ready to use;
            this.connection.send(data);
        };

        this.connection.onerror = function (error) {
            // an error occurred when sending/receiving data
            console.log(error)
        };

        this.connection.onmessage =  (message)=> {
            // try to decode json (I assume that each message
            // from server is json)
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ',
                message.data);
            return;
            }
            // handle incoming message
            //console.log(json);
            if(json.type==="sendMessage"){
                var a=String(json.targetUser) +String(json.sourceUser)
                var chatObject={...this.state.chatObject};
                var incomingChatObject={...this.state.incomingChatObject};
                if(Array.isArray( chatObject[a])){
                    chatObject[a].push(<p key={chatObject[a].length+1} style={{justifySelf:"left"}}>{json.chatstatement}</p>);
                    
                }else{
                    chatObject[a]=[<p key={1} style={{justifySelf:"left"}}>{json.chatstatement}</p>];
                };
                console.log(this.state.selectedUser._id,String(json.sourceUser))
                if(Array.isArray( incomingChatObject[a]) && this.state.selectedUser._id!==String(json.sourceUser)){
                    incomingChatObject[a].push(<p key={chatObject[a].length+1} style={{justifySelf:"left"}}>{json.chatstatement}</p>);
                }else if(this.state.selectedUser._id!==String(json.sourceUser)){
                    incomingChatObject[a]=[<p key={chatObject[a].length+1} style={{justifySelf:"left"}}>{json.chatstatement}</p>]
                }
                this.setState({
                    chatObject:chatObject,
                    incomingChatObject:incomingChatObject
                }, ()=>{
                    var el=document.getElementById("chatArea").getElementsByTagName("p");
                    el[el.length-1].scrollIntoView();
                })
            }else if(json.type==="checkOnlineStatus"){
                this.setState({
                    targetUserLoggedInStatus:json.targetUserLoggedInStatus
                })
            }
        };
    }

    sendOnlineStatus(){
        this.setState({
            loggedInOnlineStatus:navigator.onLine
        })
    }

    onSubmitChat(event){
        var x= event.which || event.keyCode;
        if(x===13){
            this.onClickSubmit.bind(this)()
        }
    }

    onClickSubmit(){
        if(this.props.username!=="unauthorized user" && this.props.username && this.state.selectedUser && document.getElementById("chatInput").value){
            this.connection.send(JSON.stringify({
                type:"sendMessage",
                chatmessage:'HK',
                chatstatement:document.getElementById("chatInput").value,
                sourceUser:this.props.id,
                targetUser:this.state.targetUser
            }));
            var a=String(this.props.id) +String(this.state.targetUser);
            var chatObject={...this.state.chatObject};
            if(Array.isArray( chatObject[a])){
                chatObject[a].push(<p style={{justifySelf:"right"}} key={this.state.chatObject[a].length+1}>{document.getElementById("chatInput").value}</p>);
                
            }else{
                chatObject[a]=[<p style={{justifySelf:"right"}} key={1}>{document.getElementById("chatInput").value}</p>]
            }
            this.setState({
                chatObject:chatObject
            }, ()=>{
                var el=document.getElementById("chatArea").getElementsByTagName("p");
                el[el.length-1].scrollIntoView();
            })
            
            document.getElementById("chatInput").value="";
        }else{
            alert("User is "+this.props.username +` and chatting with ${this.state.selectedUser}`)
        }
    }

    onLoginIconClick(){
        document.getElementById("loginPage").style.display="block"
    }

    onUserClick(event){
        console.log(event.target);
        var clickedUser=this.props.allUsers.find((a)=>{return a._id===event.target.id})
        this.setState({
            selectedUser:clickedUser,
            targetUser:event.target.id,
            incomingChatObject:{
                ...this.state.incomingChatObject,
                [String(this.props.id)+String(clickedUser._id)]:undefined
            }
        },
        ()=>{
            this.connection.send(JSON.stringify({
                type:"checkOnlineStatus",
                targetUser:this.state.targetUser,
                sourceUser:this.props.id
            }))
        });
    }
    
    render(){
        return(
            <React.Fragment>
                <header>
                    <div style={{gridRow:"1/4",gridColumn:"1/2"}} ><img src={myImg} alt="Vivek_pic" style={{width:"100%",height:"100%"}}></img></div>
                    <span style={{alignSelf:"center",justifySelf:"center",gridRow:"1/3",gridColumn:"2/3"}}>Simple ChatBot<br/> <span>By</span><br/> Vivek Kumar Singh</span>
                    
                    <span style={{gridRow:"1/2",gridColumn:"3/4",display:"flex",alignItems:"center"}}>
                        <span style={{fontSize:"24px",color:"blue",marginRight:"16px"}} className ="fa fa-user" aria-hidden="true" onClick={this.onLoginIconClick.bind(this)}>

                        </span>
                    {
                        this.props.username!=="unauthorized user" && this.props.username ?
                        <React.Fragment><span>{this.props.username}</span><div style={{height:"8px",width:"8px",borderRadius:"50%",backgroundColor:this.state.loggedInOnlineStatus?"green":"red"}}></div></React.Fragment>:
                        <span onClick={this.onLoginIconClick.bind(this)}>Login</span>
                    }
                    </span>
                    <input style={{gridRow:"2/3",gridColumn:"3/4"}}></input>
                    <span style={{gridRow:"3/4",gridColumn:"2/3",border:"1px solid blue",display:"flex",alignItems:"center"}}>
                        <span>{this.state.selectedUser._username}</span>{this.state.selectedUser?<div style={{height:"8px",width:"8px",backgroundColor:this.state.targetUserLoggedInStatus?"green":"red",borderRadius:"50%"}}></div>:""}
                    </span>
                    <button style={{gridRow:"3/4",gridColumn:"3/4",border:"1px solid blue"}}>Search</button>
                </header>
                <div id="userList" onClick={this.onUserClick.bind(this)}>
                    {
                        this.props.allUsers?this.props.allUsers.map((user)=>{
                            return <p key={user._id} id={user._id} style={{cursor:"pointer",textDecoration:"underline",color:"blue"}}>{user._username} <span style={{float:"right",marginRight:"8%"}}>{this.state.incomingChatObject[String(this.props.id)+String(user._id)]?this.state.incomingChatObject[String(this.props.id)+String(user._id)].length:""}</span></p>
                        }):""
                    }
                </div>
                <HKloginPage></HKloginPage>
                <div id="chatArea">
                    {this.state.chatObject[String(this.props.id)+String(this.state.targetUser)]?
                        this.state.chatObject[String(this.props.id)+String(this.state.targetUser)]:""}
                </div>
                {/* <div id="data"></div> */}
                <div style={{display:"flex",alignItems:"center",border:"1px solid blue"}}>
                    <input id="chatInput" onKeyUp={this.onSubmitChat.bind(this)}/>
                    <span style={{height:"100%",cursor:"pointer",width:"4%",fontSize:"21px"}} onClick={this.onClickSubmit.bind(this)}>➢</span>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
      logInState:state.logInState,
      username:state.username,
      allUsers:state.allUsers,
      id:state.id
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        fetchAllUsers:()=>{
            fetch("/fetchAllUsers").then((res)=>res.json()).then((res)=>{
            //fetch("http://localhost:8081/fetchAllUsers").then((res)=>res.json()).then((res)=>{
                dispatch({type:"FETCH_ALLUSERS",value:res})
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen);