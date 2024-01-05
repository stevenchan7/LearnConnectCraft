const { Router } = require('express');
const { addSection, getSectionByCourseID, getSectionByID, postEditSectionByID, deleteSectionByID } = require('../controllers/section.controller');
const { upload } = require('../utils/multer.util');

const router = Router();

router.post('/', addSection);

router.get('/:id', getSectionByID);

router.get('/course/:courseId', getSectionByCourseID);

router.post('/edit', postEditSectionByID);

router.post('/delete', deleteSectionByID);

router.post('/video', upload.single('video'), (req, res) => {
	res.status(201).json({ success: true, filename: req.file.filename });
});

module.exports = router;
