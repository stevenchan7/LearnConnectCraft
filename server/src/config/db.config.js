const { Sequelize } = require('sequelize');
require('dotenv').config();

exports.db = new Sequelize('lcc_dev', process.env.DB_USER, process.env.DB_PASS, {
	host: 'localhost',
	dialect: 'mysql',
	logging: false,
});
