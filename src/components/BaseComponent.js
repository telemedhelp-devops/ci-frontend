import { Component } from "react";
import { api } from "../api/api.js";
//import { connect } from 'react-redux';

class AuthReqError extends Error {
}

export class BaseComponent extends Component {
	auth() {
		window.location = '/auth/gitlab/login?redirect_url='+encodeURIComponent(window.location);
	}

	api(resource, options, parameters) {
		return api(resource, options, parameters)
			.then(response => {
				if (response.status === 401) {
					throw new AuthReqError(401);
				}
				if (response.status !== 200) {
					throw new Error(response.status);
				}
				return response;
			})
			.then(response => response.json())
			.catch((error) => {
				if (parseInt(error.message) === 401) {
					this.auth();
					return;
				}
				console.log(error.message);
				this.setState({ requestFailed: true });
			});
	}
}

//export default connect(state => (state))(BaseComponent)
