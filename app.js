const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');

const db = require("./config/key.js").mongoURI;
const users = require("./routes/api/users.js");
const tweets = require("./routes/api/tweets.js");
const User = require("./models/User.js");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB."))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello aA!");
});

app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});