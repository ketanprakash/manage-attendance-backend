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
            let attendance = 0, total = 0, percentage;
            data.rows.forEach(element => {
                if (element.holiday == false){
                    if (element.attendance) {
                        attendance += 1;
                    }
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
    const {attendance, holiday, date} = req.body;
    client.query(`UPDATE attendance SET holiday = ${holiday}, attendance = ${attendance} WHERE subjectid = '${req.params.subjectid}' AND attendance_date = '${date}'`, (err, data) => {
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

module.exports.markAttendance = markAttendance;
module.exports.getSubjectData = getSubjectData;
module.exports.editAttendanceData = editAttendanceData;