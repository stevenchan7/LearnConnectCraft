const express = require('express');
require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
const { authenticateDB } = require('./utils/db.utils');
const { db } = require('./config/db.config');
// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const authRoutes = require('./routes/auth.route');
const coreRoutes = require('./routes/core.route');
const { Functionary } = require('./models/functionary');

const app = express();

const myStore = new SequelizeStore({
	db: db,
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(session({ resave: false, saveUninitialized: false, secret: process.env.SESSION_SECRET, store: myStore }));
app.use(async (req, res, next) => {
	try {
		// Just continue if no functionary session
		if (!req.session.functionary) {
			return next();
		}
		// Get sequelize model
		const functionary = await Functionary.findOne({ where: { id: req.session.functionary.id } });
		req.functionary = functionary;

		next();
	} catch (err) {
		console.log(err);
	}
});

myStore.sync();

// Routes
app.get('/', (req, res) => {
	console.log(req.session.functionary);
	console.log(req.session.isLoggedIn);
	res.send('Hello world');
});
app.use('/auth', authRoutes);
app.use('/core', coreRoutes);

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
