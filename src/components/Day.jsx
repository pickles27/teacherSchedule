import React from 'react';
import axios from 'axios';

class Day extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dayName: 'Day',
			addMode: false,
			selectedClassId: 0,
			selectedHour: 0,
			selectedMinute: 0
		};
		
		this.onAddButtonClick = this.onAddButtonClick.bind(this);
		this.cancelAdd = this.cancelAdd.bind(this);
		this.onSelectOption = this.onSelectOption.bind(this);
		this.getClassNameFromId = this.getClassNameFromId.bind(this);
		this.onScheduleClassSubmit = this.onScheduleClassSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			dayName: this.props.day,
			scheduledClasses: this.props.scheduledClasses
		});
	}

	onAddButtonClick() {
		var firstClass = this.props.classNamesList[0];
		var newClassId = firstClass.id;
		this.setState({
			addMode: true,
			selectedClassId: newClassId,
			selectedHour: 0,
			selectedMinute: 0
		});
	}

	onSelectOption(event) {
		var selected = event.target.name;
		var value = event.target.value;
		this.setState({
			[selected]: value
		});
	}

	cancelAdd(e) {
		e.preventDefault();
		this.setState({
			addMode: false
		});
	}

	getClassNameFromId(classId) {
		var list = this.props.classNamesList;
		for (var i = 0; i < list.length; i++) {
			if (list[i].id === classId) {
				return list[i].name;
			}
		}
	}

	onScheduleClassSubmit() {
		var data = {
			teacherId: this.props.teacherId,
			classId: this.state.selectedClassId,
			day: this.state.dayName,
			hour: this.state.selectedHour,
			minute: this.state.selectedMinute
		};
		this.props.onScheduleClassSubmit(data);
		this.setState({
			addMode: false
		});
	}

	render() {
		var scheduleSectionView;
		var hours = [];
		for (var i = 0; i <= 23; i++) {
			hours.push(i);
		}
		var minutes = [];
		for (var j = 0; j < 60; j++) {
			minutes.push(j);
		}
		if (this.state.addMode) {
			scheduleSectionView = <div className="addClassInDay">
															Choose your class:
															<select onChange={this.onSelectOption} value={this.state.selectedClassId} name="selectedClassId">
																{this.props.classNamesList.map(oneClass => {
																	return (
																		<option key={oneClass.id} value={oneClass.id}>{oneClass.name}</option>
																	);
																})}
															</select>
															<br/>
															Hour:
															<select onChange={this.onSelectOption} value={this.state.selectedHour} name="selectedHour">
																{hours.map(hour => {								
																	return (
																		<option key={hour} value={hour}>{hour}</option>
																	);
																})}
															</select>
															<br/>
															Minute:
															<select onChange={this.onSelectOption} value={this.state.selectedMinute} name="selectedMinute">
																{minutes.map(minute => {
																	var label = minute.toString().padStart(2, '0');
																	return(
																		<option key={minute} value={minute}>{label}</option>
																	);
																})}
															</select>
															<br/>
															<button onClick={this.onScheduleClassSubmit}>Submit</button>
															<button onClick={this.cancelAdd}>Cancel</button>
														</div>;
		} else {
			var sortedClasses = this.props.scheduledClasses.sort((a, b) => {
				if (a.hour === b.hour) {
					if (a.minute < b.minute) {
						return -1;
					} else {
						return 1;
					}
				} else if (a.hour < b.hour) {
					return -1;
				} else {
					return 1;
				}
			});
			scheduleSectionView = <div className="daySchedule">
															<button className="addButton" 
																			onClick={this.onAddButtonClick}
																			disabled={this.props.classNamesList.length === 0}>Add Class</button>
															<ul>
																{sortedClasses.map(oneClass => {
																	var oneClassName = this.getClassNameFromId(oneClass.class_id);
																	var formattedMinute = oneClass.minute.toString().padStart(2, '0');
																	return (
																		<li key={oneClass.class_id}>
																			{oneClassName} - {oneClass.hour}:{formattedMinute}
																		</li>
																	);
																})}
															</ul>
	    											</div>;
		}
		return (
	    <div className="dayComponent">
	    	<div className="dayName">
	    		{this.props.day}
	    	</div>
	    	{scheduleSectionView}
	    </div>
		);
	}
}

export default Day;