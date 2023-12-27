const jwt = require('jsonwebtoken');
const { checkPassword, hashPassword } = require('../utils/auth.util');
const { User } = require('../models/user');
require('dotenv').config();

const signUp = async (req, res) => {
	try {
		const { firstname, lastname, email, password, profilePict } = req.body;

		const hashedPassword = await hashPassword(password);

		const newUser = {
			email: email,
			firstname: firstname,
			lastname: lastname,
			password: hashedPassword,
			profile_pict: profilePict,
		};

		const addedUser = await User.create(newUser);

		res.status(201).json({ success: true, data: addedUser });
	} catch (err) {
		console.log(err);
	}
};

const signIn = (req, res) => {
	const { email, password } = req.body;

	// Find user by email
	User.findOne({
		where: { email: email },
	})
		.then((user) => {
			if (!user) {
				return res.status(400).json({ success: false, msg: 'Wrong username or password' });
			}

			// Check password
			checkPassword(password, user.password).then((isMatch) => {
				if (!isMatch) {
					return res.status(400).json({ success: false, msg: 'Wrong username or password' });
				}

				const userData = {
					id: user.id,
					fullname: user.firstname + ' ' + user.lastname,
				};

				// Create signed JWT
				jwt.sign({ user: userData }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
					// Send response
					res.status(200).json({ success: true, token: token, data: userData, expiresIn: 3600 }); // 1h = 3600s
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

const signOut = async (req, res) => {
	try {
		await req.session.destroy();
		res.status(200).json({ success: true, msg: 'Signed out' });
	} catch (err) {
		console.log(err);
	}
};

module.exports = { signUp, signIn, signOut };
