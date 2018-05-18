import React from "react";
import { BaseComponent } from "./BaseComponent";
//import { connect } from 'react-redux';
import "./Pipeline.css";

export default class Pipeline extends BaseComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='pipeline'>
				test
			</div>
		)
	}
}

//export default connect(state => (state))(Pipelines)
