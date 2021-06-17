const express = require('express');
const { markAttendance, getSubjectData } = require('../controllers/attendance');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/markattendance/:subjectid', verifyToken, markAttendance);
router.get('/getsubjectdata/:subjectid', verifyToken, getSubjectData);

module.exports = router;