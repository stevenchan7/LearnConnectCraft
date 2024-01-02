const { Section } = require('../models/Section');

const getSectionByCourseID = async (req, res) => {
	try {
		const { courseId } = req.params;

		const courseSections = await Section.findAll({ where: { CourseId: courseId } });

		res.status(201).json({ success: true, courseSections: courseSections });
	} catch (err) {
		console.log(err);
	}
};

const addSection = async (req, res) => {
	try {
		const { title, desc, video, courseId } = req.body;

		const addedCourse = await Section.create({
			title: title,
			description: desc,
			video: video,
			CourseId: parseInt(courseId),
		});

		res.status(201).json({ success: true, data: addedCourse });
	} catch (err) {
		console.log(err);
	}
};

module.exports = { addSection, getSectionByCourseID };
