const mongoose = require("mongoose");

module.exports = mongoose.model("Article", new mongoose.Schema({
	headlineMain: String,
	bylineOriginal: String,
	pub_date: String,
	web_url: String
}));