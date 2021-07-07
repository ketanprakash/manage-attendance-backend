const client = require('../configs/db');

const addAttendance = (req, res) => {
    const {date, attendance, holiday} = req.body;
    client.query(`INSERT INTO attendance(subjectid, holiday, attendance, attendance_date, username) VALUES (${req.params.subjectid}, ${holiday}, ${attendance}, '${date}','${req.username}')`, (err, data) => {
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
    const {attendance, holiday} = req.body;
    client.query(`SELECT * FROM attendance WHERE subjectid = '${req.params.subjectid}' AND username = '${req.username}' ORDER BY attendance_date DESC`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            let attendance = 0, total = 0, percentage;
            for (i = 0; i < data.rows.length; i++){
                if (data.rows[i].holiday == false){
                    if (data.rows[i].attendance) {
                        attendance += 1;
                    }
                    total += 1;
                }
                data.rows[i].date = `${data.rows[i].attendance_date.getFullYear()}-${data.rows[i].attendance_date.getMonth() + 1}-${data.rows[i].attendance_date.getDate()}`;
            }
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
    const {attendance, holiday, id} = req.body;
    console.log(attendance, holiday, id);
    client.query(`UPDATE attendance SET holiday = '${holiday}', attendance = '${attendance}' WHERE subjectid = ${req.params.subjectid} AND id = ${id} AND username = '${req.username}'`, (err, data) => {
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