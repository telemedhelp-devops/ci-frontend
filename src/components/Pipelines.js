import React from "react";
import { BaseComponent } from "./BaseComponent";
import Pipeline from "./Pipeline";
//import { connect } from 'react-redux';
import "./Pipelines.css";

export default class Pipelines extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
		}
	}

	componentDidMount() {
		this.api("pipelines");
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div>
					Loading...
				</div>
			)
		}
		const pipelinesList = this.state.pipelines.map((pipeline) =>
			<li key={"pipeline"+pipeline.Id}><Pipeline pipeline={pipeline} /></li>
		);
		return (
			<div className='pipelinesContainer'>
				<ul>
					{pipelinesList}
				</ul>
			</div>
		)
	}
}

//export default connect(state => (state))(Pipelines)
