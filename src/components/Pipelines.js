import React from "react";
//import BootstrapTable from 'react-bootstrap-table-next';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ButtonToolbar, Button } from 'react-bootstrap';
//import Confirm from 'react-confirm-bootstrap';
import ConfirmButton from 'react-confirm-button';
import { BaseComponent } from "./BaseComponent";
//import { connect } from 'react-redux';
import "./Pipelines.css";

export default class Pipelines extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			pipelines: null,
			isLoading: true,
			me: {},
		}
	}

	considerPipelines(pipelines) {
		console.log('considerPipelines', pipelines);
		this.setState({
			isLoading: false,
			pipelines: pipelines,
		})
	}

	considerMe(me) {
		console.log('considerMe', me);
		this.setState({
			me: me,
		});
		this.api("pipelines").then(response => this.considerPipelines(response.Pipelines))
	}

	componentDidMount() {
		this.api("whoami").then(response => this.considerMe(response.User))
	}

	onDeploy(key) {
		console.log(this, 'deploy', key);
		this.api('pipelines', {method: 'PATCH'}, {Id: key}).then(data => this.afterUpdate(data));
	}

	onDelete(key) {
		console.log(this, 'delete', key);
		this.api('pipelines', {method: 'DELETE'}, {Id: key}).then(data => this.afterUpdate(data));
	}

	afterUpdate(data) {
		console.log(data);

		this.componentDidMount();
	}

	buttonsFormatter(cell, row) {
		console.log(cell, row);
		if (row.ApprovedAt != null) {
			return (
				<p>Ожидает деплоя</p>
			)
		}
		if (row.Approvals != null) {
			for (var i=0; i<row.Approvals.length; i++) {
				var approval = row.Approvals[i];
				if (approval.Username.toLowerCase() == this.state.me.GitLabUser.NickName.toLowerCase()) {
					return (
						<ButtonToolbar>
							&nbsp;Утверждено&nbsp;
							<ConfirmButton
								onConfirm={this.onDelete.bind(this, row.Id)}
								text="Удалить"
								confirming={{
									text: "Точно удалить?",
								}}
								className="btn btn-danger"
							/>
						</ButtonToolbar>
					)
				}
			}
		}
		if (row.RequiredApprovals == null) {
			return (
				<p>Неизвестный тип проекта</p>
			)
		}
		var foundMe = false;
		for (var i=0; i<row.RequiredApprovals.length; i++) {
			var requiredApproval = row.RequiredApprovals[i];
			if (requiredApproval.Username.toLowerCase() == this.state.me.GitLabUser.NickName.toLowerCase()) {
				foundMe = true;
				break;
			}
		}
		if (!foundMe) {
			return (
				<p>В доступе отказано</p>
			)
		}
		return (
			<ButtonToolbar>
				<ConfirmButton
					onConfirm={this.onDeploy.bind(this, row.Id)}
					text="Задеплоить"
					confirming={{
						text: "Точно задеплоить?",
					}}
					className="btn btn-primary"
				/>
				<ConfirmButton
					onConfirm={this.onDelete.bind(this, row.Id)}
					text="Отклонить"
					confirming={{
						text: "Точно отклонить?",
					}}
					className="btn btn-danger"
				/>
			</ButtonToolbar>
		);
	}

	requiredApprovalsFormatter(a) {
		var usernames = [];
		for (var i=0; i<a.length; i++) {
			var row = a[i];
			usernames.push(row.Username)
		}
		return usernames.join(', ');
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div>
					<br/>
					<h1 style={{textAlign:'center'}}>
						Загрузка...
					</h1>
				</div>
			)
		}
		return (
			<BootstrapTable data={this.state.pipelines} search={true} hover={true} options={{noDataText:"нет данных"}}>
				<TableHeaderColumn dataField="Id" isKey={true}  dataAlign="center" dataSort={true} headerText="№">№</TableHeaderColumn>
				<TableHeaderColumn dataField="CreatedAt"        dataAlign="left"   dataSort={true} headerText="Дата">Дата</TableHeaderColumn>
				<TableHeaderColumn dataField="ProjectName"      dataAlign="right"  dataSort={true} headerText="Проект">Проект</TableHeaderColumn>
				<TableHeaderColumn dataField="TagName"          dataAlign="left"                   headerText="Версия">Версия</TableHeaderColumn>
				<TableHeaderColumn dataField="" dataFormat={this.buttonsFormatter.bind(this)} headerText="Управление">Управление</TableHeaderColumn>
				<TableHeaderColumn dataField="RequiredApprovals" dataAlign="left" headerText="Ожидается" dataFormat={this.requiredApprovalsFormatter.bind(this)}>Ожидается</TableHeaderColumn>
			</BootstrapTable>
		)
	}
}

//export default connect(state => (state))(Pipelines)
