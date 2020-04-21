import React, { Component } from 'react';

import Dropdown from '../dropdown/Dropdown.js' ;
import './main.css' ;
import './main2.css' ;

import SearchSolid from './search-solid.svg' ;
import Gear from '../images/settings.png' ;
import Notif from '../images/bell.png' ;
import Power from '../images/off.png' ;

class Main extends Component 
{	
	state = {
		searchBy   : 'UserName',
		searchFor  : 'User' ,
		searchText : '' ,
		chatSearch : ''
	} ;

	onSearchForChange = (event) => {
		this.setState({searchFor: event.target.value});
	}

	onSearchByChange = (event) => {
		this.setState({searchBy: event.target.value});
	}

	onSearchInputChange = (event) => {
		this.setState({searchText: event.target.value});
	}

	onChatSearchChange = (event) => {
		this.setState({chatSearch: event.target.value});
	}

	onKP = (event) => {
		if(event.key === 'Enter')
		{	console.log(this.state) ;
			this.setState({searchText: ''});
		}
	}

	render() {
		// console.log(this.props.user) ;
		const {searchBy, searchFor, searchText} = this.state ;
		return (
			<div className="main-div">
				<div className="left-col">
					<div className="left-head">
						<div> Logo </div>
						<p> User Name </p>
						<button className="main-btn icon-btn">
							<img src={Notif} alt="notif bell" className="icon"/>  
						</button>
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
						<div> Img </div>
						<p className="chat-name"> Chat Name </p>
						<button className="main-btn icon-btn">
							<img src={Gear} alt="settings" className="icon"/>  
						</button>
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
						<img src={SearchSolid} alt="search" className="icon picture" />
						<div > Search </div>
						<button className="main-btn icon-btn">
							<img src={Power} alt="logout" className="icon"/>  
						</button>
					</div>
					<div className="right-dropdown">
						<Dropdown label="Search For" value={searchFor} 
								  options={['User','Chat', 'Game']} onChange={this.onSearchForChange}/>
						<Dropdown label="Search By" value={searchBy} 
								  options={['UserName','Name']} onChange={this.onSearchByChange}/>
					</div>
					<div className="search" >
						<p className="search-i"> 
							<img className="sea-i" src={SearchSolid} alt="search" width="25"/>
						</p>
						<input type="text" className='search-inp' onKeyPress={this.onKP}
								onChange={this.onSearchInputChange} value={searchText}/>
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
