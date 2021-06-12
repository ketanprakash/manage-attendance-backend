const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/verifyToken')
const {addSubject, deleteSubject, getSubjects} = require('../controllers/subjects');

router.post('/addsubject', verifyToken, addSubject);
router.delete('/deletesubject/:subjectid', verifyToken, deleteSubject);
router.get('/getsubjects', verifyToken, getSubjects);

module.exports = router;