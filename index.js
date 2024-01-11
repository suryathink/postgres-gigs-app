const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const db = require("./config/database");

const app = express();

// Handlebars middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Gig Routes
app.use("/gigs", require("./routes/gigs"));




db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Error", err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
