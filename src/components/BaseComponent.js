import { Component } from "react";
import { api } from "../api/api.js";
//import { connect } from 'react-redux';

export class BaseComponent extends Component {
	api(resource, options, parameters) {
		return api(resource, options, parameters)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(response);
				}
				return response;
			})
			.then(response => response.json())
			.catch((error) => {
				console.log('error: ' + error);
				this.setState({ requestFailed: true });
			});
	}
}

//export default connect(state => (state))(BaseComponent)
