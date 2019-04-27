import React from 'react';
import Day from './Day.jsx';

var Week = () => {
	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	var days = daysOfWeek.map(day => {
		return (
			<Day key={day} day={day}/>
		);
	});

	return (
		<div className="weekComponent">
			{days}
		</div>
	);
}

export default Week;