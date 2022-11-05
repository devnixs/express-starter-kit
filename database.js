const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: {
    underscored: true,
  },
}); // Example for postgres

module.exports = { sequelize };
