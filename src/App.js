import React from 'react';
import { BaseComponent } from "./components/BaseComponent";
import Pipelines from "./components/Pipelines";
import './App.css';

class App extends BaseComponent {
	render() {
		//console.log('App', this);
		return (
			<Pipelines history={this.props.history} />
		);
	}
}

export default App;
