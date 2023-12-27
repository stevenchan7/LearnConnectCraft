exports.authenticateDB = async (db) => {
	try {
		await db.authenticate();
		console.log('Connection has been established successfully.');
		await db.sync();
	} catch (err) {
		console.error('Unable to connect to the database:', err);
		throw new Error();
	}
};
