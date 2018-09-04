import ReactGA from 'react-ga';
import React, { Component } from "react";
import Header from "./Header/Header.jsx";
import Banner from "./Banner/Banner.jsx";
import Services from "./Services/Services.jsx";
import Contact from "./Contact/Contact.jsx";
import ContactForm from "./Contact/ContactForm.jsx";
import LoginRoutes from "../routes/Routes.jsx";


class App extends Component{
	constructor() {
		super();
		// Google analytics initialization 
		ReactGA.initialize('UA-124346038-1');
		ReactGA.pageview(window.location.pathname);
	}

	render(){
		return(
			<div className="App">
				<LoginRoutes/>
				<Header/>
				<Banner/>
				<Services/>
				<Contact/>
				<ContactForm/>
			</div>
		);  
	}
}

export default App;
