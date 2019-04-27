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
			classNamesList: [], //list of classes teacher has, for example may be 5-6 classes total [{id and name}, ...]
			weeklySchedule: {} //format: {Monday: [], Tuesday: [], ....}
		}
		this.submitNewClass = this.submitNewClass.bind(this);
		this.onInputTextChange = this.onInputTextChange.bind(this);
		this.getClassList = this.getClassList.bind(this);
	}

	componentDidMount() {
		//axios call to get all classes, including class list for AddClass component and schedule data for Week
		this.getClassList();
	}

	getClassList() {
		var teacherId = this.props.teacherId;
		axios.get('/classList', {
			params: {
				teacherId: teacherId
			}
		})
		.then(result => {
			var classList = result.data;
			this.setState({
				classNamesList: classList
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	onInputTextChange(event) {
		this.setState({
			inputText: event.target.value
		})
	}

	submitNewClass(event) {
		var newName = this.state.inputText;
		var teacherId = this.props.teacherId;
		//axios post request to submit new class, set state with updated class list for teacher id (this.props.teacherId)
		//return class list by teacher id
		axios.post('/newClass', {
			teacherId: teacherId,
			className: newName
		})
		.then(result => {
			var newClass = result.data;
			var newClassNamesList = this.state.classNamesList.slice().concat(newClass);
			this.setState({
				classNamesList: newClassNamesList,
				inputText: ''
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	render() {
		return (
			<div className="configPageComponent">
			<div className="addAndListClassSection">
				<AddClass inputText={this.state.inputText} onInputTextChange={this.onInputTextChange} submitNewClass={this.submitNewClass}/>
				<ClassList classNamesList={this.state.classNamesList} />
			</div>
			<Week weeklySchedule={this.state.weeklySchedule}/>
			</div>
		);
	}
}

export default ConfigPage;