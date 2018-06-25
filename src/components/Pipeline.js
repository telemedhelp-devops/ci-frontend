import React from "react";
import { BaseComponent } from "./BaseComponent";
//import { connect } from 'react-redux';
import "./Pipeline.css";

export default class Pipeline extends BaseComponent {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.pipeline);
		return (
			<tr className='pipeline'>
				<td>{this.props.pipeline.ProjectName}</td><td>{this.props.pipeline.TagName}</td>
			</tr>
		)
	}
}

//export default connect(state => (state))(Pipelines)
