const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { authenticateDB } = require('./utils/db.util');
const { db } = require('./config/db.config');
const authRouter = require('./routes/auth.route');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(async (req, res, next) => {
// 	try {
// 		// Just continue if no functionary session
// 		if (!req.session.functionary) {
// 			return next();
// 		}
// 		// Get sequelize model
// 		const functionary = await Functionary.findOne({ where: { id: req.session.functionary.id } });
// 		req.functionary = functionary;

// 		next();
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// Routes
app.get('/', (req, res) => {
	console.log('Hello world');
	res.send('Hello world');
});

app.use('/auth', authRouter);

// Port
const PORT = process.env.PORT;

authenticateDB(db)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
