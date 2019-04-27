import React from 'react';
import axios from 'axios';

class Day extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dayName: 'Day',
			dayClasses: [],
			addMode: false
		}
		this.onAddSubmit = this.onAddSubmit.bind(this);
		this.onAddButtonClick = this.onAddButtonClick.bind(this);
	}

	componentDidMount() {
		this.setState({
			dayName: this.props.day,
			dayClasses: this.props.dayClasses
		});
	}

	onAddButtonClick() {
		this.setState({
			addMode: true
		});
	}

	onAddSubmit() {
		//axios call to post new timeslot
		//return new dayClasses array from db
		//invoke setState to update dayClasses array with returned array from db
	}

	render() {
		var scheduleSectionView;
		if (this.state.addMode) {
			scheduleSectionView = <div className="addClassInDay">
															Put 3 drop down menus here for class name, hour and minute
															submit button invokes axios call to add class name/time to database
															<button onClick={this.onAddSubmit}>Submit</button>
														</div>;
		} else {
			scheduleSectionView = <div className="daySchedule">
															display list of all day's classes 
	    											</div>
		}
		return (
	    <div className="dayComponent">
	    	<div className="dayName">
	    		{this.props.day}
	    	</div>
	    	<button className="addButton" onClick={this.onAddButtonClick}>Add Class</button>
	    	{scheduleSectionView}
	    </div>
		);
	}
}

export default Day;