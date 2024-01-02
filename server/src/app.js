const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const { authenticateDB } = require('./utils/db.util');
const { db } = require('./config/db.config');
const authRouter = require('./routes/auth.route');
const courseRouter = require('./routes/course.route');
const sectionRouter = require('./routes/section.route');

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
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.get('/', (req, res) => {
	console.log('Hello world');
	res.send('Hello world');
});

app.use('/auth', authRouter);
app.use('/course', courseRouter);
app.use('/section', sectionRouter);

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
