import React from 'react';
import Day from './Day.jsx';

var Week = (props) => {
	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	var dayClasses;
	var days = daysOfWeek.map(day => {
		dayClasses = props.weeklySchedule[day]; //will be in form of array
		return (
			<Day key={day} day={day} dayClasses={dayClasses}/>
		);
	});

	return (
		<div className="weekComponent">
			{days}
		</div>
	);
}

export default Week;