const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/verifyToken')
const {addSubject} = require('../controllers/subjects');

router.post('/addsubject', verifyToken, addSubject);

module.exports = router;