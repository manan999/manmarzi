import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

import LogoTitle from '../LogoTitle/LogoTitle.js' ;
import Header from '../Header/Header.js' ;
import Features from '../Features/Features.js' ;
import './home.css'

class Home extends Component 
{
	render() {
		return (
			<div className="home">
				<Header />
				<LogoTitle />
				<div className = "buttons" >
					<Link to="/login"> Login </Link>
					<Link to="/register"> Register </Link>
					<button> Continue As Guest </button>
				</div>
				<Features />
			</div>
		);
	}
}

export default Home ;
