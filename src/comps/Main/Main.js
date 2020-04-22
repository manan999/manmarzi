import React, { Component } from 'react';
import {Redirect} from'react-router-dom' ;

import { addNotif} from '../notif.js' ;
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
		searchData : [] ,
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
		this.setState({searchText: event.target.value, searchData: {}});
	}

	onChatSearchChange = (event) => {
		this.setState({chatSearch: event.target.value});
	}

	onLogoutClick = () => {
		fetch('https://manmarzi.herokuapp.com/logoutAll',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + this.props.usertoken} ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data =>{	
				console.log(data) ;
				addNotif('Successfully Logged Out', 'success')
				this.props.setUser({}) ;
			}) 
			.catch( err  => console.log(err) ) ;
	}

	onKP = (event) => {
		const {searchFor, searchBy, searchText} = this.state ;
		let url = 'http://localhost:8000/search?q='+searchText+'&type=' ;
		url += searchFor+'&filter='+searchBy ;
		if(event.key === 'Enter')
		{	
    		fetch(url,{
				method : 'get' ,
				headers : { 'Content-Type' : 'application/json', 
							'Authorization' : 'Bearer ' + this.props.usertoken} ,
			})
    		.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {
				this.setState({searchData: data, searchText: ''});
			})
			.catch( err => {
				console.log(err) ;

				addNotif(err.message, 'error') ;
			})
		}
	}

	generateSearchResult = () => {
		if(this.state.searchData.length > 0)
			return this.state.searchData.map( one => <div> This is some data </div> ) ;
		else
			return <p> Type Something and press "Enter" to search </p>
	}

	render() {
		const {searchBy, searchFor, searchText} = this.state ;
		if(this.props.user)
		{
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
							<button className="main-btn icon-btn" onClick={this.onLogoutClick}>
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
							{ this.generateSearchResult() }
						</div>
					</div>
				</div>
			);
		}
		else
			return <Redirect to = '/login' />
	}
}

export default Main ;
