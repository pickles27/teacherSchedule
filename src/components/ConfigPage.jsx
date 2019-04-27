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
			weeklySchedule: {
				Monday: [],
				Tuesday: [],
				Wednesday: [],
				Thursday: [],
				Friday: []
			} //format: {Monday: [{id, name, hour, minute}], Tuesday: [], ....}
		}
		this.submitNewClass = this.submitNewClass.bind(this);
		this.onInputTextChange = this.onInputTextChange.bind(this);
		this.getClassList = this.getClassList.bind(this);
		this.getSchedule = this.getSchedule.bind(this);
		this.onScheduleClassSubmit = this.onScheduleClassSubmit.bind(this);
	}

	componentDidMount() {
		var teacherId = this.props.teacherId;
		this.getClassList(teacherId);
		this.getSchedule(teacherId);
	}

	getClassList(teacherId) {
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

	getSchedule(teacherId) {
		axios.get('/getSchedule', {
			params: {
				teacherId: teacherId
			}
		})
		.then(result => {
			var scheduleList = result.data; //array of objects
			var schedule = {
				Monday: [],
				Tuesday: [],
				Wednesday: [],
				Thursday: [],
				Friday: []
			};
			for (var i = 0; i < scheduleList.length; i++) {
				schedule[scheduleList[i].day] = schedule[scheduleList[i].day].concat(scheduleList[i]);
			}
			this.setState({
				weeklySchedule: schedule
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	onScheduleClassSubmit(data) {
		axios.post('/scheduleClass', data)
		.then(() => {
			this.getSchedule(this.props.teacherId);
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
		event.preventDefault();
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
				<AddClass inputText={this.state.inputText} 
									onInputTextChange={this.onInputTextChange} 
									submitNewClass={this.submitNewClass}/>
				<ClassList classNamesList={this.state.classNamesList} />
			</div>
			<Week teacherId={this.props.teacherId} 
						classNamesList={this.state.classNamesList} 
						weeklySchedule={this.state.weeklySchedule}
						onScheduleClassSubmit={this.onScheduleClassSubmit}/>
			</div>
		);
	}
}

export default ConfigPage;