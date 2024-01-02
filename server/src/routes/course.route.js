const { Router } = require('express');
const { addCourse, getCourseByID, postEditCourseByID, getCourse, deleteCourseByID } = require('../controllers/course.controller');
const { upload } = require('../utils/multer.util');

const router = Router();

router.get('/', getCourse);

router.post('/', addCourse);

router.post('/delete', deleteCourseByID);

router.get('/:id', getCourseByID);

router.post('/edit', postEditCourseByID);

router.post('/thumbnail', upload.single('thumbnail'), (req, res) => {
	res.status(201).json({ success: true, filename: req.file.filename });
});

module.exports = router;
