const { query } = require('express');
const client = require('../configs/db');

const markAttendance = (req, res) => {
    const {attendance, holiday} = req.body;
    const current_datetime = new Date();
    client.query(`INSERT INTO attendance(subjectid, holiday, attendance, attendance_date) VALUES (${req.params.subjectid}, ${holiday}, ${attendance}, '${current_datetime.getFullYear()}-${current_datetime.getMonth() + 1}-${current_datetime.getDate()}')`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            res.status(200).json({
                message: "Attendance Marked"
            })
        }
    });
}

const getSubjectData = (req, res) => {
    const {attendance, holiday} = req.body;
    client.query(`SELECT * FROM attendance WHERE subjectid = '${req.params.subjectid}'`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            res.status(200).json(data.rows);
        }
    });
}



module.exports.markAttendance = markAttendance;
module.exports.getSubjectData = getSubjectData;
