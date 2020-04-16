import React from 'react';
import socketIOClient from "socket.io-client";
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;
import ReactNotification from 'react-notifications-component' ;
import 'react-notifications-component/dist/theme.css' ;

import './app.css' ;
import NotFound from './comps/Home/NotFound.js' ;
import Home from './comps/Home/Home.js' ;
import Login from './comps/Login-Register/Login/Login.js' ;
import Register from './comps/Login-Register/Register/Register.js' ;
import Main from './comps/Main/Main.js' ;

class App extends React.Component
{ 
  state = {
    user : {} 
    // input : '' ,
    // serverAddress : '127.0.0.1:8000'
  }

  resize = () => this.forceUpdate()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  //For Logging In User
  setUser = (data) => {
    this.setState({user: data});
  }

  //Check if user is logged in
  checkUser = (str = 'token') => {
    if( this.state.user.user )
      if(str === 'token')
        return this.state.user.token ;
      else if(str === 'user') 
        return this.state.user.user ;
      else
        return this.state.user.user.name ;
    else 
      return false ; 
  }  

  // socket = {} ;

  // componentDidMount = () => {
  //   this.socket = socketIOClient(this.state.serverAddress) ;
    
  //   this.socket.on('ping', data => {
  //     console.log(data) ;
  //     if(data)
  //       this.setState({msgs: data.msgs}) 
  //   }) ;
  // }

  // onButtonClick = ( ) => {
  //   this.socket.emit('message', {msg: this.state.input}) ;
  //   this.setState({input : ''});
  // }

  // onInputChange = (event) => {
  //   this.setState({input: event.target.value});
  // }

  // generateMessages = () => {
  //   return this.state.msgs.map( msg => <p> {msg} </p>) ;
  // }

  render = () => {
    return (
      <div className="App">
        <ReactNotification />
        <BrowserRouter>
          <div>
            <Switch>
              <Route path='/' exact render={props=><Home {...props} user={this.checkUser('name')}/>} />
              <Route path='/home' exact render={props=><Main {...props} user={this.checkUser('user')}/>} />
              <Route path='/login' exact render={props=><Login {...props} setUser={this.setUser} user={this.checkUser()}/>} />
              <Route path='/register' exact render={props=><Register {...props} setUser={this.setUser} user={this.checkUser()}/>} />
              <Route exact component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

        // <div> {this.generateMessages()} </div>
        // <input type="text" value={this.state.input} onChange={this.onInputChange}/> 
        // <button onClick={this.onButtonClick}> Send </button> 
              
              // <Route path='/color' exact render={props=><ColorDetection {...props} usertoken={this.checkUser()} color={color} />}/>
              // <Route path='/history' exact render={props=><History {...props} usertoken={this.checkUser()} color={color} />} />
              // <Route path='/Userprofile' exact render={props=><UserProfile {...props} usertoken={this.checkUser()} color={color} />} />
