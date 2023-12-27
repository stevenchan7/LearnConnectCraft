const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
	try {
		const hashedPassword = await bcrypt.hash(plainPassword, 12);
		return hashedPassword;
	} catch (err) {
		console.log(err);
		throw new Error();
	}
};

const checkPassword = (plainPassword, hashedPassword) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(isMatch);
			}
		});
	});
};

module.exports = { hashPassword, checkPassword };
