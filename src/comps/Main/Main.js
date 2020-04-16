import React, { Component } from 'react';

class Main extends Component 
{
	render() {
		console.log(this.props.user) ;
		return (
			<div>
				<p> This is Main </p>
			</div>
		);
	}
}

export default Main ;
