import React, { Component } from 'react';

import Dropdown from '../dropdown/Dropdown.js' ;
import SearchSolid from './search-solid.svg' ;
import './main.css' ;
import './main2.css' ;

class Main extends Component 
{	
	state = {
		searchBy : ''
	} ;

	render() {
		console.log(this.props.user) ;
		const {searchBy} = this.state ;
		return (
			<div className="main-div">
				<div className="left-col">
					<div className="left-head">
						<div> Logo </div>
						<p> User Name </p>
						<button className="main-btn" id="lo-btn"> Logout </button>
					</div>
					<div className="left-btn">
						<button className="main-btn"> + New Chat </button>
						<button className="main-btn"> + New Message </button>
					</div>
					<div className="search" >
						<p className="search-i"> 
							<img className="sea-i" src={SearchSolid} alt="search" width="25"/>
						</p>
						<input type="text" className='search-inp' />
					</div>
					<div className="left-chats" >
						This is left left-chats
					</div>
				</div>
				<div className="mid-col">
					<div className="mid-head">
						Chat Name
					</div>
					<div className="mid-chats" >
						This is mid-chats
					</div>
					<div className="mid-box" >
						This is mid box
					</div>
				</div>
				<div className="right-col">
					<div className="right-head">
						Search
					</div>
					<div className="right-choice">
						This is right choice
					</div>
					<div className="right-dropdown">
						<Dropdown label="Search By" value={searchBy} 
								  options={['','Name','UserName']} onChange={this.onSearchByChange}/>
					</div>
					<div className="search" >
						<p className="search-i"> 
							<img className="sea-i" src={SearchSolid} alt="search" width="25"/>
						</p>
						<input type="text" className='search-inp' />
					</div>
					<div className="right-chats" >
						This is right chats
					</div>
				</div>
			</div>
		);
	}
}

export default Main ;
