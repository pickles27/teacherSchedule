import React from 'react';

var classList = (props) => {
	var classListDisplay;
	if (props.classNamesList.length) {
		var classes = props.classNamesList.map(className => <li key={className.id}>{className.name}</li>);
		classListDisplay = <ul>
												 {classes}
											 </ul>;
	} else {
		classListDisplay = <p>No classes added yet.</p>
	}

	return (
		<div className="classListComponent">
			<h3>
				Class List
			</h3>
			{classListDisplay}
		</div>
	);
}

export default classList;