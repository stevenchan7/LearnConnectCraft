'use strict';
const { Model, DataTypes } = require('sequelize');
const { db } = require('../config/db.config');

class User extends Model {}

// Attributes init
User.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.BIGINT,
			autoIncrement: true,
		},
		fullname: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		username: {
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
		image_url: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize: db,
		modelName: 'users',
	}
);

module.exports = { User };
