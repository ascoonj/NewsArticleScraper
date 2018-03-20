const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;

//Models
var db = require("./models");


// Use morgan logger for logging requests
app.use(logger("dev"));

// Enable handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


//Routes
require("./scripts/scrape.js")(app);
require("./routes/htmlRoutes.js")(app);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
//add mongo heroku uri
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/scrapedReviewsDb",
);

var dbconnect = mongoose.connection;

dbconnect.on('error', function(err) {
    console.log("Mongoose error: ", err);
});

dbconnect.once('open', function() {
    console.log("Mongoose connection successful.");
});




// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

