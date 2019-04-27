import React from 'react';
import axios from 'axios';
import AddClass from './AddClass.jsx';
import Week from './Week.jsx';
import ClassList from './ClassList.jsx';

class ConfigPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputText: '',
			classNamesList: [], //list of classes teacher has, for example may be 5-6 classes total 
			weeklySchedule: []  //json list of schedule data, with classnames and times for each day
		}
		this.submitNewClass = this.submitNewClass.bind(this);
		this.onInputTextChange = this.onInputTextChange.bind(this);
	}

	componentDidMount() {
		//axios call to get all classes, including class list for AddClass component and schedule data for Week
		//this axios call is based on teacherid which is passed down from App
	}

	onInputTextChange(event) {
		this.setState({
			inputText: event.target.value
		})
	}

	submitNewClass() {
		//axios post request to submit new class, set state with updated class list for teacher id (this.props.teacherId)
		//return class list by teacher id
	}

	render() {
		return (
			<div className="configPageComponent">
			<div className="addAndListClassSection">
				<AddClass onInputTextChange={this.onInputTextChange} submitNewClass={this.submitNewClass}/>
				<ClassList classNamesList={this.state.classNamesList} />
			</div>
			<Week />
			</div>
		);
	}
}

export default ConfigPage;