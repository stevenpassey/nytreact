const Article = require("../models/Article");

module.exports = {
	create: (req, res) => {
		Article.create(req.body).then((doc) => {
			res.json(doc);
		}).catch((error) => { res.json(error) });
	},
	
	delete: (req, res) => {
		Article.deleteOne({_id: req.params.id}).then((doc) => {
			res.json(doc);
		}).catch((error) => { res.json(error) });
	},
	
	getSaved: (req, res) => {
		Article.find().then((doc) => {
			res.json(doc);
		}).catch((error) => { res.json(error); });
	}
}