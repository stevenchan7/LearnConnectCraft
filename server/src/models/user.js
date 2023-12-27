'use strict';
const { DataTypes } = require('sequelize');
const { db } = require('../config/db.config');

const User = db.define('User', {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.BIGINT,
		autoIncrement: true,
	},
	firstname: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	lastname: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	email: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	profile_pict: {
		type: DataTypes.STRING,
	},
});

module.exports = { User };
