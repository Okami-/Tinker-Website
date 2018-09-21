import ReactGA from 'react-ga';
import React, { Component } from "react";
import Header from "./Header/Header.jsx";
import Banner from "./Banner/Banner.jsx";
import Services from "./Services/Services.jsx";
import Contact from "./Contact/Contact.jsx";
import ContactForm from "./Contact/ContactForm.jsx";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from "../components/Admin/Login.jsx";
import Profile from "../components/Profile/Profile.jsx";
import CreatePost from "../components/Blog/CreatePost.jsx";
import Fullscreen from "../components/Utilities/Fullscreen";
import { Provider } from 'react-redux'
import { configureStore } from '../store'
import Blog from '../components/Blog/Blog'

const store = configureStore();

class App extends Component {

	constructor() {
		super();
		// Google analytics initialization 
		ReactGA.initialize('UA-124346038-1');
		ReactGA.pageview(window.location.pathname);
	}
	makeFullscreen(component, color) {
		return (
			<Fullscreen color={color}>
				{component}
			</Fullscreen>
		);
	}
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Header />
						<Switch>
							<Route exact path='/' render={(props) =>
								this.makeFullscreen(
									<div>
										<Banner />
										<Services />
										<Contact />
										<ContactForm />
									</div>
									, '#202020')
							} />
							<Route path="/profile" component={Profile} />
							<Route path="/login" component={Login} />
							<Route path="/post/new" render={(props) =>
								this.makeFullscreen(<CreatePost />, "white")
							} />
							<Route path="/blog" component={Blog} />
						</Switch>
					</div >
				</Router>
			</Provider >
		);
	}
}

export default App;
