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

const getSectionByID = async (req, res) => {
	try {
		const { id } = req.params;

		const section = await Section.findOne({ where: { id: id } });

		res.status(201).json({ success: true, section: section });
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

const postEditSectionByID = async (req, res) => {
	try {
		const { id, title, desc, video } = req.body;

		const updatedSection = {
			title: title,
			description: desc,
			video: video,
		};

		const section = await Section.update(updatedSection, {
			where: {
				id: id,
			},
		});

		res.status(200).json({ success: true, data: section });
	} catch (err) {
		console.log(err);
	}
};

const deleteSectionByID = async (req, res) => {
	try {
		const { id } = req.body;

		await Section.destroy({ where: { id: id } });

		res.status(201).json({ success: true });
	} catch (err) {
		console.log(err);
	}
};

module.exports = { addSection, getSectionByCourseID, getSectionByID, postEditSectionByID, deleteSectionByID };
