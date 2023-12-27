const { User } = require('../models/user');

const checkDupliacateEmail = async (req, res, next) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ where: { email: email } });

		if (user) {
			return res.status(400).json({ success: false, msg: 'Email already used' });
		}

		next();
	} catch (err) {
		console.log(err);
	}
};

module.exports = { checkDupliacateEmail };
