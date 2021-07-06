const express = require('express');
const { markAttendance, addAttendance, getSubjectData, editAttendanceData } = require('../controllers/attendance');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/markattendance/:subjectid', verifyToken, markAttendance);
router.post('/addattendance/:subjectid', verifyToken, addAttendance)
router.get('/getsubjectdata/:subjectid', verifyToken, getSubjectData);
router.put('/editattendancedata/:subjectid', verifyToken, editAttendanceData);

module.exports = router;