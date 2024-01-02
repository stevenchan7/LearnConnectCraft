const { Router } = require('express');
const { addSection, getSectionByCourseID } = require('../controllers/section.controller');
const { upload } = require('../utils/multer.util');

const router = Router();

router.post('/', addSection);

router.get('/:courseId', getSectionByCourseID);

router.post('/video', upload.single('video'), (req, res) => {
	res.status(201).json({ success: true, filename: req.file.filename });
});

module.exports = router;
