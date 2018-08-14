import React, { Component } from "react";
import Header from "./Header/Header.jsx";
import Banner from "./Banner/Banner.jsx";
import Services from "./Services/Services.jsx";

class App extends Component{
	render(){
		return(
			<div className="App">
				<Header/>
				<Banner/>
				<Services/>
			</div>
		);
	}
}

export default App;