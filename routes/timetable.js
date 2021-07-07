const express = require('express');
const { addTimeTable, getTimeTable } = require('../controllers/timetable.js');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/addtimetable/:subjectid', verifyToken, addTimeTable);
router.get('/gettimetable/:subjectid', verifyToken, getTimeTable);

module.exports = router;