import React, { Component } from 'react';

import './logotitle.css' ;

class LogoTitle extends Component 
{	
	render() 
	{	const str = (this.props.small==='yes'?'logotitle small':'logotitle') ;
		return (
			<div className={str}>
				<h1> ManMarzi </h1>
				<h3> Chat Games with Friends </h3>
			</div>
		);
	}
}

export default LogoTitle ;
