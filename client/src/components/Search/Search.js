import React from "react";
import "./search.css";

function Search(props) 
{
	return (
		<div id="search-bar">
			<h1>NYT Search</h1>
			<div id="topic-label">
				Topic
			</div>
			<input type="text" id="userTopic" onInput={props.cbInputProp}/>
			<div id="s-year-label">
				Start Year
			</div>
			<input type="text" id="userSYear" maxLength="4" onInput={props.cbInputProp}/>
			<div id="e-year-label">
				End Year
			</div>
			<input type="text" id="userEYear" maxLength="4" onInput={props.cbInputProp}/>
			<button id="search-submit" onClick={props.cbProp}>Submit</button>
		</div>
  );
}

export default Search