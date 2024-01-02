'use strict';
const { DataTypes } = require('sequelize');
const { db } = require('../config/db.config');

const Course = db.define('Course', {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.BIGINT,
		autoIncrement: true,
	},
	title: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	description: {
		allowNull: false,
		type: DataTypes.TEXT,
	},
	instructor: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	category: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	price: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	thumbnail: {
		allowNull: false,
		type: DataTypes.STRING,
	},
});

module.exports = { Course };
