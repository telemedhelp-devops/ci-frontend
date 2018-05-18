import React from 'react';
import { BaseComponent } from "./components/BaseComponent";
import Pipelines from "./components/Pipelines";
import './App.css';

class App extends BaseComponent {
	render() {
		return (
			<Pipelines />
		);
	}
}

export default App;
