import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { addNotif, remNotif } from '../../notif.js' ;
import LogoTitle from '../../LogoTitle/LogoTitle.js' ;
import Form from '../../Form/Form.js' ;
import Header from '../../Header/Header.js' ;
import Text from '../../text/Text.js' ;
import '../loginreg.css' ;

const initUser = {
	email: '',
	password: '',
} ;

class Login extends Component 
{
	state = {
		data : initUser,
		error : ''
	}

	onSubmitClick = () => {
		if(this.state.error === '')
		{
			const obj = {
				email : this.state.data.email ,
				password : this.state.data.password
			} ;

    		const id = addNotif('Please Wait...') ;
			fetch('https://manmarzi.herokuapp.com/login',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json'} ,
				body :JSON.stringify(obj) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data =>{
				this.setState({data: initUser});
				
				remNotif(id) ;	
    			addNotif('Successfully Logged In', 'success') ;
				
				this.props.setUser(data) ;
				this.props.history.push('/home');
			}) 
			.catch( err  => {
				console.log(err) ;
				
				remNotif(id) ;	
    			addNotif(err.message, 'error') ;
			}) ;
		}
		else
		{
			this.setState({error: 'Please Fix any errors before submitting form'})
		}
	}

	onEmailChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'E-Mail can not be blank'}) ;
		else
		{	if(this.state.error === 'E-Mail can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, email : event.target.value} }) ;
	}

	onPasswordChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Password can not be blank'}) ;
		else
		{	if(this.state.error === 'Password can not be blank')
					this.setState({error: ''}) ;
		}
		this.setState({data: {...this.state.data, password : event.target.value} }) ;
	}

	render() {
		const {email, password} = this.state.data ;
		if(this.props.user)
			return <Redirect to='/home' />
		else
		{
			return (
				<div className="login">
					<Header />
					<LogoTitle small="yes"/>
					<Form title=" Login Details " error={this.state.error}
						b2="Login &gt;&nbsp;" onb2Click={this.onSubmitClick} 
						b1="&lt;&nbsp; Register" b1type="link" to="/register">
						<Text label="E-Mail" value={email} onChange={this.onEmailChange}/>
						<Text label="Password" value={password} type="pw" onChange={this.onPasswordChange}/>
					</Form>
				</div>
			);
		}
	}
}

export default Login ;
