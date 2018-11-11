import React, { Component } from 'react';
import ReactGA from 'react-ga';

class App extends Component {
	static makeFullscreen(component, color) {
		return (
			<Fullscreen color={color}>
				{component}
			</Fullscreen>
		);
	}
	componentDidMount(){
 		document.body.style.background = "#202020";
	}

	constructor() {
		super();
		// Google analytics initialization 
		ReactGA.initialize('UA-124346038-1');
		ReactGA.pageview(window.location.pathname);
	}
	render() {
		return (
			<div className="app"></div>
		);
	}
}

export default App;
