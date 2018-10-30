const Sequelize = require('sequelize');
const db = ('../utils/sequelize');

const User = db.define('user', {
    id: {type: Sequelize.BIGINT, primaryKey: true},
    role: Sequelize.STRING
});

module.exports = User;
