import React, { Component } from "react";
import Header from "./Header/Header.jsx";
import Banner from "./Banner/Banner.jsx";
import Services from "./Services/Services.jsx";
import Contact from "./Contact/Contact.jsx";
import style from "../assets/stylesheets/main.scss";

class App extends Component{
	render(){
		return(
			<div className="App">
				<Header/>
				<Banner/>
				<Services/>
				<Contact/>
			</div>
		);
	}
}

export default App;