import React from 'react';
import socketIOClient from "socket.io-client";

class App extends React.Component
{ 
  state = {
    // response : false ,
    msgs : [] ,
    input : '' ,
    serverAddress : '127.0.0.1:8000'
  }

  socket = {} ;

  componentDidMount = () => {
    this.socket = socketIOClient(this.state.serverAddress) ;
    
    this.socket.on('ping', data => {
      console.log(data) ;
      if(data)
        this.setState({msgs: data.msgs}) 
    }) ;
  }

  onButtonClick = ( ) => {
    this.socket.emit('message', {msg: this.state.input}) ;
    this.setState({input : ''});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  generateMessages = () => {
    return this.state.msgs.map( msg => <p> {msg} </p>) ;
  }

  render = () => {
    return (
      <div className="App">
        <div> {this.generateMessages()} </div>
        <input type="text" value={this.state.input} onChange={this.onInputChange}/> 
        <button onClick={this.onButtonClick}> Send </button> 
      </div>
    );
  }
}

export default App;
