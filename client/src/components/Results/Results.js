import React from "react";
import "./results.css";

function Results(props) 
{
	return (
		<div className="results-div">
			{props.results.length > 0 ? <h1>{props.title}</h1> : ""}
			{ 
				props.results.map((result) => { 
				
					if(result.headlineMain.length > 0)
					{
						return( 
								<div className="result" key={result.pub_date}>
									<div className="result-text">
										<h1><a href={result.web_url} target="_blank">{result.headlineMain}</a></h1>
										<span className="byline-original">{result.bylineOriginal}</span>
										&nbsp; &nbsp;
										<span className="pub-date">{result.pub_date}</span>
									</div>
									<div className="result-buttons">
										<a href={result.web_url} target="_blank"><button className="notes-button">View</button></a>
										<button className="save-button" disabled={checkComplete(props.title, result.pub_date, props.saved)} data-id={result.pub_date} data-method={props.title === "Saved" ? "Delete" : "Save"} onClick={props.cbProp}>{props.title === "Saved" ? "Delete" : "Save"}</button>
									</div>
								</div>
						)
					}
					else
					{
						return null;
					}
				})
			}
		</div>
  );
}

function checkComplete(type, date, array)
{
	if(type === "Saved")
	{
		return false;
	}
	else
	{
		const myDateArray = array.map((value) => value.pub_date);
		
		if(myDateArray.indexOf(date) !== -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

export default Results