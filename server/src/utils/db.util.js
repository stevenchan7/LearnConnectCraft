const { Course } = require('../models/Course');
const { Section } = require('../models/Section');

exports.authenticateDB = async (db) => {
	try {
		Course.hasMany(Section);
		Section.belongsTo(Course);

		await db.authenticate();
		await db.sync();
		console.log('Connection has been established successfully.');
	} catch (err) {
		console.error('Unable to connect to the database:', err);
		throw new Error();
	}
};
