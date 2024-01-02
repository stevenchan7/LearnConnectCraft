const { Course } = require('../models/Course');

const addCourse = async (req, res) => {
	try {
		const { title, desc, instructor, price, category, thumbnail } = req.body;

		const addedCourse = await Course.create({
			title: title,
			description: desc,
			price: parseInt(price),
			instructor: instructor,
			thumbnail: thumbnail,
			category: category,
		});

		res.status(201).json({ success: true, data: addedCourse });
	} catch (err) {
		console.log(err);
	}
};

const getCourse = async (req, res) => {
	try {
		const courses = await Course.findAll();
		res.status(200).json({ success: true, courses: courses });
	} catch (err) {
		console.log(err);
	}
};

const getCourseByID = async (req, res) => {
	try {
		const { id } = req.params;

		const course = await Course.findOne({
			where: {
				id: id,
			},
		});

		res.status(200).json({ success: true, course: course });
	} catch (err) {
		console.log(err);
	}
};

const postEditCourseByID = async (req, res) => {
	try {
		const { id, title, desc, instructor, price, category, thumbnail } = req.body;

		const updatedCourse = {
			title: title,
			description: desc,
			price: parseInt(price),
			instructor: instructor,
			thumbnail: thumbnail,
			category: category,
		};

		const course = await Course.update(updatedCourse, {
			where: {
				id: id,
			},
		});

		res.status(200).json({ success: true, data: course });
	} catch (err) {
		console.log(err);
	}
};

const deleteCourseByID = async (req, res) => {
	try {
		const { id } = req.body;

		await Course.destroy({ where: { id: id } });

		res.status(201).json({ success: true });
	} catch (err) {
		console.log(err);
	}
};

module.exports = { addCourse, getCourseByID, postEditCourseByID, getCourse, deleteCourseByID };
