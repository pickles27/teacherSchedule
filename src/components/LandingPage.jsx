import React from 'react';

var LandingPage = (props) => {
	return (
		<div className="landingPageComponent">
			<h2>Teacher Schedule</h2>
			<p>Hello, {props.teacherName}!</p>
			<button onClick={props.changePage} name="config">Configure Your Schedule</button>
		</div>
	);
}

export default LandingPage;