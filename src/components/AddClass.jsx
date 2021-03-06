import React from 'react';

var AddClass = (props) => {
	return (
		<div className="addClassComponent">
			<h3>
				Add Class
			</h3>
			<p>
				Please give each class a unique name, limit of 100 characters.
			</p>
			<p>
				For example: "9th Grade Chemistry" or "Physics Grade 12"
			</p>
			<input type="text" onChange={props.onInputTextChange} value={props.inputText}/>
			<button onClick={props.submitNewClass}>Submit New Class</button>
		</div>
	);
}

export default AddClass;