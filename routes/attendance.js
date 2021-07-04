const express = require('express');
const { markAttendance, getSubjectData, editAttendanceData } = require('../controllers/attendance');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/markattendance/:subjectid', verifyToken, markAttendance);
router.get('/getsubjectdata/:subjectid', verifyToken, getSubjectData);
router.put('/editattendancedata/:subjectid', verifyToken, editAttendanceData);

module.exports = router;