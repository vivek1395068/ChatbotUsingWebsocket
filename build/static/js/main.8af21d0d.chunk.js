(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,n){e.exports=n.p+"static/media/myphoto.5ebdd676.jpg"},20:function(e,t,n){e.exports=n(37)},25:function(e,t,n){},33:function(e,t,n){},35:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),s=n(17),r=n.n(s),o=(n(25),n(3)),l=n(4),c=n(7),u=n(5),d=n(8),g=n(10),m=n(1),p=(n(27),n(6)),h=function(e){function t(){var e,n;Object(o.a)(this,t);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={modal:!0,displaySigninOrSignup:!0},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=document.getElementById("loginPage");window.onclick=function(t){t.target===e&&(e.style.display="none")},document.getElementsByClassName("close")[0].onclick=function(){e.style.display="none"}}},{key:"onLoginFormSubmit",value:function(e,t){t.preventDefault();var n=document.getElementById("loginForm").elements,i={};i.type=e;for(var a=0;a<n.length;a++)"submit"!==n[a].type&&"button"!==n[a].type&&(i[n[a].name]=n[a].value);i.username&&i.password?void 0!==i.confirmpassword&&i.password!==i.confirmpassword?alert("password mismatch"):(this.props.fetchUserDetails(i),document.getElementById("loginPage").style.display="none"):alert("Please enter username and password")}},{key:"onClickSignInLink",value:function(){this.setState({displaySigninOrSignup:!this.state.displaySigninOrSignup})}},{key:"render",value:function(){return a.a.createElement("div",{id:"loginPage"},a.a.createElement("div",{id:"modal",style:{display:this.state.modal?"grid":"none"}},a.a.createElement("span",{className:"close"},"\xd7"),a.a.createElement("form",{id:"loginForm",onSubmit:function(e){e.preventDefault()}},a.a.createElement("label",null,"username : "),a.a.createElement("input",{type:"text",name:"username",required:!0}),a.a.createElement("label",null,"password : "),a.a.createElement("input",{type:"text",name:"password",required:!0}),this.state.displaySigninOrSignup?a.a.createElement(a.a.Fragment,null,a.a.createElement("u",{style:{color:"blue",cursor:"pointer"},onClick:this.onClickSignInLink.bind(this)},"Sign up"),a.a.createElement("input",{type:"submit",value:"Login",key:"loginbutton",style:{gridColumn:"2/3"},onClick:this.onLoginFormSubmit.bind(this,"signin")})):a.a.createElement(a.a.Fragment,null,a.a.createElement("label",null,"confirm password : "),a.a.createElement("input",{type:"text",key:"confirmpassword",name:"confirmpassword"}),a.a.createElement("label",null,"passcode : "),a.a.createElement("input",{type:"text",key:"passcode",name:"passcode"}),a.a.createElement("u",{style:{color:"blue",cursor:"pointer"},onClick:this.onClickSignInLink.bind(this)},"Sign in"),a.a.createElement("input",{type:"submit",value:"signup",key:"signupbutton",style:{gridColumn:"2/3"},onClick:this.onLoginFormSubmit.bind(this,"signup")})))))}}]),t}(a.a.Component),y=Object(p.b)(function(e){return{logInState:e.logInState,username:e.username}},function(e){return{fetchUserDetails:function(t){fetch("/loginUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(t){e({type:"FETCH_USER",value:t})})}}})(h),b=n(19),f=n.n(b),S=(n(33),function(e){function t(){var e;return Object(o.a)(this,t),e=Object(c.a)(this,Object(u.a)(t).call(this)),window.WebSocket=window.WebSocket||window.MozWebSocket,e.state={selectedUser:"",targetUser:null,loggedInOnlineStatus:!1,targetUserLoggedInStatus:!1,chatObject:{},incomingChatObject:{}},e}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("online",this.sendOnlineStatus.bind(this)),window.addEventListener("offline",this.sendOnlineStatus.bind(this)),this.props.fetchAllUsers()}},{key:"componentWillReceiveProps",value:function(e){e.id!==this.props.id&&this.setupWebsocketConnection(JSON.stringify({type:"sendLoginId",id:e.id,loggingInOnlineState:navigator.onLine})),"unauthorized user"!==e.username&&e.username&&this.setState({loggedInOnlineStatus:navigator.onLine})}},{key:"setupWebsocketConnection",value:function(e){var t=this;this.connection=new WebSocket("ws://"+window.location.host+"/echo"),this.connection.onopen=function(n){t.connection.send(e)},this.connection.onerror=function(e){console.log(e)},this.connection.onmessage=function(e){try{var n=JSON.parse(e.data)}catch(o){return void console.log("This doesn't look like a valid JSON: ",e.data)}if("sendMessage"===n.type){var i=String(n.targetUser)+String(n.sourceUser),s=Object(m.a)({},t.state.chatObject),r=Object(m.a)({},t.state.incomingChatObject);Array.isArray(s[i])?s[i].push(a.a.createElement("p",{key:s[i].length+1,style:{justifySelf:"left"}},n.chatstatement)):s[i]=[a.a.createElement("p",{key:1,style:{justifySelf:"left"}},n.chatstatement)],console.log(t.state.selectedUser._id,String(n.sourceUser)),Array.isArray(r[i])&&t.state.selectedUser._id!==String(n.sourceUser)?r[i].push(a.a.createElement("p",{key:s[i].length+1,style:{justifySelf:"left"}},n.chatstatement)):t.state.selectedUser._id!==String(n.sourceUser)&&(r[i]=[a.a.createElement("p",{key:s[i].length+1,style:{justifySelf:"left"}},n.chatstatement)]),t.setState({chatObject:s,incomingChatObject:r},function(){var e=document.getElementById("chatArea").getElementsByTagName("p");e[e.length-1].scrollIntoView()})}else"checkOnlineStatus"===n.type&&t.setState({targetUserLoggedInStatus:n.targetUserLoggedInStatus})}}},{key:"sendOnlineStatus",value:function(){this.setState({loggedInOnlineStatus:navigator.onLine})}},{key:"onSubmitChat",value:function(e){13===(e.which||e.keyCode)&&this.onClickSubmit.bind(this)()}},{key:"onClickSubmit",value:function(){if("unauthorized user"!==this.props.username&&this.props.username&&this.state.selectedUser&&document.getElementById("chatInput").value){this.connection.send(JSON.stringify({type:"sendMessage",chatmessage:"HK",chatstatement:document.getElementById("chatInput").value,sourceUser:this.props.id,targetUser:this.state.targetUser}));var e=String(this.props.id)+String(this.state.targetUser),t=Object(m.a)({},this.state.chatObject);Array.isArray(t[e])?t[e].push(a.a.createElement("p",{style:{justifySelf:"right"},key:this.state.chatObject[e].length+1},document.getElementById("chatInput").value)):t[e]=[a.a.createElement("p",{style:{justifySelf:"right"},key:1},document.getElementById("chatInput").value)],this.setState({chatObject:t},function(){var e=document.getElementById("chatArea").getElementsByTagName("p");e[e.length-1].scrollIntoView()}),document.getElementById("chatInput").value=""}else alert("User is "+this.props.username+" and chatting with ".concat(this.state.selectedUser))}},{key:"onLoginIconClick",value:function(){document.getElementById("loginPage").style.display="block"}},{key:"onUserClick",value:function(e){var t=this;console.log(e.target);var n=this.props.allUsers.find(function(t){return t._id===e.target.id});this.setState({selectedUser:n,targetUser:e.target.id,incomingChatObject:Object(m.a)({},this.state.incomingChatObject,Object(g.a)({},String(this.props.id)+String(n._id),void 0))},function(){t.connection&&t.connection.send(JSON.stringify({type:"checkOnlineStatus",targetUser:t.state.targetUser,sourceUser:t.props.id}))})}},{key:"render",value:function(){var e=this;return a.a.createElement(a.a.Fragment,null,a.a.createElement("header",null,a.a.createElement("div",{style:{gridRow:"1/4",gridColumn:"1/2"}},a.a.createElement("img",{src:f.a,alt:"Vivek_pic"})),a.a.createElement("span",{style:{alignSelf:"center",justifySelf:"center",gridRow:"1/3",gridColumn:"2/3"}},"Simple ChatBot",a.a.createElement("br",null)," ",a.a.createElement("span",null,"By"),a.a.createElement("br",null)," Vivek Kumar Singh"),a.a.createElement("span",{style:{gridRow:"1/2",gridColumn:"3/4",display:"flex",alignItems:"center",justifyContent:"center"}},a.a.createElement("span",{style:{fontSize:"24px",color:"blue",marginRight:"16px"},className:"fa fa-user","aria-hidden":"true",onClick:this.onLoginIconClick.bind(this)}),"unauthorized user"!==this.props.username&&this.props.username?a.a.createElement(a.a.Fragment,null,a.a.createElement("span",null,this.props.username),a.a.createElement("div",{style:{height:"8px",width:"8px",borderRadius:"50%",backgroundColor:this.state.loggedInOnlineStatus?"green":"red"}})):a.a.createElement("span",{onClick:this.onLoginIconClick.bind(this)},"Login")),a.a.createElement("input",{style:{gridRow:"2/3",gridColumn:"3/4"}}),a.a.createElement("span",{style:{gridRow:"3/4",gridColumn:"2/3",border:"1px solid blue",display:"flex",alignItems:"center",minHeight:"32px"}},a.a.createElement("span",null,this.state.selectedUser._username),this.state.selectedUser?a.a.createElement("div",{style:{height:"8px",width:"8px",backgroundColor:this.state.targetUserLoggedInStatus?"green":"red",borderRadius:"50%"}}):""),a.a.createElement("button",{style:{gridRow:"3/4",gridColumn:"3/4",border:"1px solid blue"}},"Search")),a.a.createElement("div",{id:"userList",onClick:this.onUserClick.bind(this)},this.props.allUsers?this.props.allUsers.map(function(t){return a.a.createElement("p",{key:t._id,id:t._id,style:{cursor:"pointer",textDecoration:"underline",color:"blue"}},t._username," ",a.a.createElement("span",{style:{float:"right",marginRight:"8%"}},e.state.incomingChatObject[String(e.props.id)+String(t._id)]?e.state.incomingChatObject[String(e.props.id)+String(t._id)].length:""))}):""),a.a.createElement(y,null),a.a.createElement("div",{id:"mobileviewUL",onClick:this.onUserClick.bind(this)},this.props.allUsers?this.props.allUsers.map(function(t){return a.a.createElement("span",{key:t._id,id:t._id,style:{cursor:"pointer",textDecoration:"underline",color:"blue",marginLeft:"8px"}},t._username," ",a.a.createElement("span",{style:{float:"right",marginRight:"8%"}},e.state.incomingChatObject[String(e.props.id)+String(t._id)]?e.state.incomingChatObject[String(e.props.id)+String(t._id)].length:""))}):""),a.a.createElement("div",{id:"chatArea"},this.state.chatObject[String(this.props.id)+String(this.state.targetUser)]?this.state.chatObject[String(this.props.id)+String(this.state.targetUser)]:""),a.a.createElement("div",{style:{display:"flex",alignItems:"center",border:"1px solid blue",gridRow:"3/3"}},a.a.createElement("input",{id:"chatInput",onKeyUp:this.onSubmitChat.bind(this)}),a.a.createElement("span",{style:{height:"100%",cursor:"pointer",width:"4%",fontSize:"21px"},onClick:this.onClickSubmit.bind(this)},"\u27a4")))}}]),t}(a.a.Component)),E=Object(p.b)(function(e){return{logInState:e.logInState,username:e.username,allUsers:e.allUsers,id:e.id}},function(e){return{fetchAllUsers:function(){fetch("/fetchAllUsers").then(function(e){return e.json()}).then(function(t){e({type:"FETCH_ALLUSERS",value:t})})}}})(S),v=(n(35),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(E,null))}}]),t}(i.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var k=n(11),O={logInState:!1,username:null,allUsers:[],id:null},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;return"FETCH_USER"===t.type?Object(m.a)({},e,{logInState:t.value.logInState,username:t.value.username,id:t.value.id}):"FETCH_ALLUSERS"===t.type?Object(m.a)({},e,{allUsers:t.value}):Object(m.a)({},e)},j=Object(k.b)(C);r.a.render(a.a.createElement(p.a,{store:j},a.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,2,1]]]);
//# sourceMappingURL=main.8af21d0d.chunk.js.map