const express = require('express');
const { addAttendance, getSubjectData, editAttendanceData, deleteAttendance } = require('../controllers/attendance');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/addattendance/:subjectid', verifyToken, addAttendance)
router.delete('/deleteattendance/:subjectid', verifyToken, deleteAttendance);
router.get('/getsubjectdata/:subjectid', verifyToken, getSubjectData);
router.put('/editattendancedata/:subjectid', verifyToken, editAttendanceData);

module.exports = router;