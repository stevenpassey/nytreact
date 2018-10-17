import React, { Component } from "react";
import "./App.css";
import API from "./util/API.js";
import Search from "./components/Search/Search";
import Results from "./components/Results/Results";

class App extends Component {
	
	constructor(props)
	{
		super(props)
		
		/*this.state = { resultsArray: [{headlineMain: "Liverpool Defeats Stoke and Edges Closer to Chelsea", bylineOriginal: "By ELIAS MUHANNA", pub_date: "2018-09-15T18:26:41+0000", web_url: "https://topics.nytimes.com/top/reference/timestopics/subjects/p/pianos/index.html"}],
					   savedArray: [{headlineMain: "Liverpool Defeats Stoke and Edges Closer to Chelsea", bylineOriginal: "By ELIAS MUHANNA", pub_date: "2018-09-15T18:26:41+0000", web_url: "https://topics.nytimes.com/top/reference/timestopics/subjects/p/pianos/index.html"}] 
		};*/
		
		this.state = { resultsArray: [],
					   savedArray: [],
					   userTopic: "",
					   userSYear: "",
					   userEYear: "",
		};
	}
	
	componentDidMount()
	{
		console.log("App component just mounted!");
		this.retrieve_saved();
	}
	
	updateValuesFromSearchInputs = (event) =>
	{
		const myNewStateObject = {};
		myNewStateObject[event.target.id] = event.target.value;
		this.setState(myNewStateObject);
	}
	
	submit_search = () =>
	{
		API.timesSearch(this.state.userTopic, this.state.userSYear, this.state.userEYear).then((res) => {
			
			let newSearchObjectArray = res.data.response.docs;
			
			let newResultsArray = newSearchObjectArray.map((result) => {
				
				if(result.byline)
				{
					if(result.byline.original)
					{
							
					}
					else
					{
						result.byline.original = "";
					}
				}
				else
				{
					result.byline = {};
					result.byline.original = "";
				}
				
				
				if(result.web_url.indexOf("https://topics") !== -1 || result.document_type !== "article")
				{
					return {
						headlineMain: "",
						bylineOriginal: "",
						pub_date: "",
						web_url: ""
					};
				}
				return {
					headlineMain: result.headline.main,
					bylineOriginal: result.byline.original,
					pub_date: result.pub_date,
					web_url: result.web_url
				};
			});
			
			this.setState({resultsArray: newResultsArray});
		}).catch((err) => console.log(err));
	}
	
	modify_article = (event) => {
		
		const method = event.target.dataset.method;
		const pubDateToFind = event.target.dataset.id;
		let resultToFind;
		
		if(method === "Save")
		{
		
			this.state.resultsArray.forEach((result) => {
				if(result.pub_date === pubDateToFind)
				{
					resultToFind = result;
				}
			});
			
			API.saveArticle(resultToFind).then((res) => {
				this.retrieve_saved();
			});
		}
		else
		{
			this.state.savedArray.forEach((result) => {
					
				if(result.pub_date === pubDateToFind)
				{
					resultToFind = result;
				}
			});
			
			API.removeArticle(resultToFind._id).then((res) => {
				this.retrieve_saved();
			});
		}
	}

	
	retrieve_saved = () => {
		API.retrieveSaved().then((res) => {
			let newSavedObjectArray = res.data;
			
			this.setState({savedArray: newSavedObjectArray});
		}).catch((err) => console.log(err));
		
	}
	
	render() {
		return (
			<div id="app-wrap">
				<Search cbProp={this.submit_search} cbInputProp={this.updateValuesFromSearchInputs}/>
				<Results title="Results" results={this.state.resultsArray} saved={this.state.savedArray} cbProp={this.modify_article}/>
				<Results title="Saved" results={this.state.savedArray} cbProp={this.modify_article}/>
			</div>
		);
	}
}

export default App;
