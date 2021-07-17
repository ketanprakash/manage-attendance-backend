const client = require('../configs/db');

const addAttendance = (req, res) => {
    const {date, attendance} = req.body;
    client.query(`INSERT INTO attendance(subjectid, attendance, attendance_date, username) VALUES (${req.params.subjectid}, '${attendance}', '${date}','${req.username}')`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            res.status(200).json({
                message: "Attendance Added"
            })
        }
    });
}

const deleteAttendance = (req, res) => {
    const {id} = req.body;
    client.query(`DELETE FROM attendance WHERE id = ${id} AND subjectid = ${req.params.subjectid} AND username = '${req.username}'`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            res.status(200).json({
                message: "Attendance Deleted"
            })
        }
    });
}

const getSubjectData = (req, res) => {
    client.query(`SELECT * FROM attendance WHERE subjectid = ${req.params.subjectid} AND username = '${req.username}' ORDER BY attendance_date DESC`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            let attendance = 0, total = 0, percentage;
            data.rows.forEach((element) => {
                if (element,attendance == "Present"){
                    total += 1;
                    attendance += 1;
                }
                else if (element.attendance == "Absent"){
                    total += 1;
                }
            });
            percentage = attendance / total * 100;
            res.status(200).json({
                data: data.rows,
                attendance, 
                total,
                percentage
            });
        }
    });
}

const editAttendanceData = (req, res) => {
    const {attendance, id} = req.body;
    console.log(attendance, id);
    client.query(`UPDATE attendance SET attendance = '${attendance}' WHERE subjectid = ${req.params.subjectid} AND id = ${id} AND username = '${req.username}'`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            res.status(200).json({
                message: "Updated Database"
            });
        }
    });
}

module.exports.addAttendance = addAttendance;
module.exports.deleteAttendance = deleteAttendance;
module.exports.getSubjectData = getSubjectData;
module.exports.editAttendanceData = editAttendanceData;