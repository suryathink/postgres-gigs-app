const { Sequelize } = require("sequelize");

const db = new Sequelize("codegig", "postgres", process.env.POSTGRES_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
