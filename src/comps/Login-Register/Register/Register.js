import React, { Component } from 'react';
import valid from 'validator' ;

import LogoTitle from '../../LogoTitle/LogoTitle.js' ;
import Form from '../../Form/Form.js' ;
import Header from '../../Header/Header.js' ;
import Text from '../../text/Text.js' ;
import '../loginreg.css' ;

const initUser = {
	name: '',
	username: '',
	email: '',
	password: '',
	repass: '',
} ;

class Register extends Component 
{	
	state = {
		data : initUser,
		error : ''
	}

	onSubmitClick = () => {
		if(this.state.error === '')
		{	const {name, username, email, password} = this.state.data
			const obj = { name, username, email, password } ;
			console.log(obj) ;
			// fetch('https://ov-api.herokuapp.com/users',{
			// 	method : 'post' ,
			// 	headers : { 'Content-Type' : 'application/json'} ,
			// 	body :JSON.stringify(obj) ,
			// })
			// .then(res => {
			// 	if(res.ok)
			// 		return res.json() ;
			// 	else
			// 		throw Error(res.statusText) ;
			// })
			// .then(data => {	
			// 	this.setState({username: '', pw: '', rpw: '', email: ''});
				
			// 	this.props.setUser(data) ;

			// 	this.props.history.push('/');
			// }) 
			// .catch( err  => console.log(err) ) ;
		}
		else
		{
			this.setState({error: 'Please Fix any errors before submitting form'})
		}
	}

	onNameChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Name can not be blank'}) ;
		else
		{	if(this.state.error === 'Name can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, name : event.target.value} }) ;
	}

	onUsernameChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Username can not be blank'}) ;
		else
		{	if(this.state.error === 'Username can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, username : event.target.value} }) ;
	}

	onEmailChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'E-Mail can not be blank'}) ;
		else if(!valid.isEmail(event.target.value))
			this.setState({error: 'This might not be a valid E-Mail address'});
		else
		{	if(this.state.error === 'E-Mail can not be blank' || this.state.error === 'This might not be a valid E-Mail address') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, email : event.target.value} }) ;
	}

	onPasswordChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Password can not be blank'}) ;
		else if(event.target.value.length < 6)
			this.setState({error: 'Password must be at least 6 digits long'}) ;
		else if(event.target.value !== this.state.data.repass)
			this.setState({error: 'Re-Password must match password'}) ;
		else
		{	if(this.state.error === 'Password can not be blank' || this.state.error === 'Password must be at least 6 digits long' || this.state.error === 'Re-Password must match password')
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, password : event.target.value} }) ;
	}

	onRepassChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Re-Password can not be blank'}) ;
		else if(event.target.value.length < 6)
			this.setState({error: 'Re-Password must be at least 6 digits long'}) ;
		else if(event.target.value !== this.state.data.password)
			this.setState({error: 'Password must match re-password'}) ;
		else
		{	if(this.state.error === 'Re-Password can not be blank' || this.state.error === 'Re-Password must be at least 6 digits long' || this.state.error === 'Password must match re-password')
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, repass : event.target.value} }) ;
	}

	render() {
		const {name, email, password, repass, username} = this.state.data ;
		return (
			<div className="register">
				<Header />
				<LogoTitle small="yes"/>
				<Form title=" Registration Form " error={this.state.error}
					b2="Submit &gt;&nbsp;" onb2Click={this.onSubmitClick} 
					b1="&lt;&nbsp; Login" b1type="link" to="/login">
					<Text label="Name" value={name} onChange={this.onNameChange}/>
					<Text label="Username" value={username} onChange={this.onUsernameChange}/>
					<Text label="E-Mail" value={email} onChange={this.onEmailChange}/>
					<Text label="Password" value={password} type="pw" onChange={this.onPasswordChange}/>
					<Text label="Retype Password" value={repass} type="pw" onChange={this.onRepassChange}/>
				</Form>
			</div>
		);
	}
}

export default Register ;
