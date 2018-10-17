const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const controller = require("./controllers/controller");

// Define API routes here
app.post("/save", controller.create);
app.delete("/save/:id", controller.delete);

app.get("/saved", controller.getSaved);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const db = process.env.MONGODB_URI || "mongodb://localhost/nytreact";

mongoose.connect(db, function(error) {

	if (error) { console.error(error); }
	else { console.log("MongoDB connected to nytreact"); }
  
	app.listen(PORT, () => {
		console.log(`Express Server now on port ${PORT}!`);
	});
});



