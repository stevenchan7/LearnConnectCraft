const jwt = require('jsonwebtoken');

const { Functionary } = require('../models/functionary');
const { Role } = require('../models/role');
const { Division } = require('../models/division');
const { checkPassword } = require('../utils/auth.util');
require('dotenv').config();

const signUp = async (req, res) => {
	try {
		const { email, username, password, fullname, imageURL, roleID, divisionID } = req.body;

		const hashedPassword = await hashPassword(password);

		const newFunctionary = {
			email: email,
			username: username,
			password: hashedPassword,
			fullname: fullname,
			image_url: imageURL,
			role_id: parseInt(roleID),
			division_id: parseInt(divisionID),
		};

		const addedFunctionary = await Functionary.create(newFunctionary);

		res.status(201).json({ success: true, data: addedFunctionary });
	} catch (err) {
		console.log(err);
	}
};

const signIn = (req, res) => {
	const { username, password } = req.body;

	// Find functionary by username
	Functionary.findOne({
		where: { username: username },
		include: [
			{
				model: Role,
				attributes: ['id', 'title'],
			},
			{ model: Division, attributes: ['id', 'name'] },
		],
	})
		.then((functionary) => {
			if (!functionary) {
				return res.status(400).json({ success: false, msg: 'Username is wrong' });
			}

			// Check password
			checkPassword(password, functionary.password).then((isMatch) => {
				if (!isMatch) {
					return res.status(400).json({ success: false, msg: 'Password is wrong' });
				}

				const functionaryData = {
					id: functionary.id,
					username: functionary.username,
					name: functionary.fullname,
					role: functionary.role.title,
					division: functionary.division.name,
				};

				// Create signed JWT
				jwt.sign({ functionary: functionaryData }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
					// Send response
					res.status(200).json({ success: true, token: token, data: functionaryData });
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
