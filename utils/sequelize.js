const Sequelize = require ('sequelize');

const sequelize = new Sequelize (
  "demo_oneauth",
  "demo_oneauth",
  "demo_oneauth",
  {
    host: "localhost",
    dialect: "postgres"
    // pool: {
    //   max: 5,
    //   min: 0,
    //   idle: 10000
    // },
    // logging: console.log
  }
)

module.exports = sequelize
