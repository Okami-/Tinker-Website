import React, { Component } from "react";
//import { hot } from 'react-hot-loader'

import Header from "./Header/Header.jsx";
import Banner from "./Banner/Banner.jsx";
import Services from "./Services/Services.jsx";
import Contact from "./Contact/Contact.jsx";
import Form from "./Contact/Form.jsx";

import style from "../assets/stylesheets/main.scss";

class App extends Component{
	render(){
		return(
			<div className="App">
				<Header/>
				<Banner/>
				<Services/>
				<Contact/>
				<Form/>
			</div>
		);
	}
}

export default App;