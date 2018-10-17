import axios from "axios";

export default {
	
	timesSearch: (topic, syear, eyear) => {
		
		syear = syear ? "&begin_date=" + syear + "0101" : syear;
		eyear = eyear ? "&end_date=" + eyear + "1231" : eyear;
	
		var query_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q="
					 + topic 
					 + syear
					 + eyear;
					 
		return axios.get(query_url);
	},
	
	saveArticle: (result) => {
		return axios.post("/save", result);
	},
	
	removeArticle: (id) => {
		return axios.delete("/save/" + id);
	},
	
	retrieveSaved: () => {
		return axios.get("/saved");
	}
	
}