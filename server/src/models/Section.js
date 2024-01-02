'use strict';
const { DataTypes } = require('sequelize');
const { db } = require('../config/db.config');

const Section = db.define('Section', {
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
	video: {
		allowNull: false,
		type: DataTypes.STRING,
	},
});

module.exports = { Section };
