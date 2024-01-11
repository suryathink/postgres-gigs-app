const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/database");

const app = express();

app.use(cors());

app.use(express.json());

// Gig Routes
app.use("/gigs", require("./routes/gigs"));

const databaseConnection = async () => {
  try {
    await db.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.log("Error", error);
  }
};

databaseConnection();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
