import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import style from "./assets/stylesheets/main.scss";
import './assets/vendor/pe-icon-7-stroke/dist/pe-icon-7-stroke.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { configureStore } from './store';

import Login from "./components/Admin/Login.jsx";
import App from "./components/App.jsx";
import Header from "./components/Header/Header.jsx";
import Banner from "./components/Banner/Banner.jsx";
import Services from "./components/Services/Services.jsx";
import Contact from "./components/Contact/Contact.jsx";
import ContactForm from "./components/Contact/ContactForm.jsx";
import Profile from "./components/Profile/Profile.jsx";
import CreatePost from "./components/Blog/CreatePost.jsx";
import Fullscreen from "./components/Utilities/Fullscreen";
import Blog from './components/Blog/PostsList';
import PostShow from './components/Blog/PostShow';
import PostsList from './components/Blog/PostsList'

// Redux Store
const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Header />
				<Switch>
					<Route path="/posts/new" component={CreatePost} />
					<Route path="/posts/:id" component={PostShow} />
					<Route path="/posts" component={PostsList} />
					<Route path="/profile" component={Profile} />
					<Route path="/login" component={Login} />
					<Route exact path='/' render={(props) =>
							<div>
								<Banner />
								<Services />
								<Contact />
								<ContactForm />
							</div>
					} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider >
, document.getElementById("root")
);

registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}