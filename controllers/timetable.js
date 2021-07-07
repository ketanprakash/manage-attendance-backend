const client = require('../configs/db');

const addTimeTable = (req, res) => {
    const { timetable } = req.body;
    client.query(`DELETE FROM timetable WHERE subjectid = ${req.params.subjectid} AND username = '${req.username}'`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            timetable.forEach(day => {
                client.query(`INSERT INTO timetable(username, subjectid, day) VALUES ('${req.username}', ${req.params.subjectid}, ${day})`, (err, data) => {
                    if (err){
                        console.log(err);
                        res.status(500).json({
                            message: "Database Error!!"
                        })
                    }
                }) 
            });
            res.status(200).json({
                message: "Time Table Added!!"
            })
        }
    });
}

const getTimeTable = (req, res) => {
    client.query(`SELECT day FROM timetable WHERE subjectid = ${req.params.subjectid} AND username = '${req.username}'`, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).json({
                message: "Database Error!!"
            })
        }
        else {
            console.log(data.rows);
            res.status(200).json(data.rows);
        }
    });
}

module.exports.addTimeTable = addTimeTable;
module.exports.getTimeTable = getTimeTable;