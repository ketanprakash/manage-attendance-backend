const client = require('../configs/db');

const addSubject = (req, res) => {
	const {subject} = req.body;
	const email = req.email;
	client.query(`INSERT INTO subjects(email, name) VALUES ('${email}', '${subject}')`, (err, data) => {
		if (err){
			console.log(err);
			res.status(500).json({
				message: "Database Error!"
			})
		}
		else{
			res.status(200).json({
				message: `${subject} Added Successfully!!`
			})
		}
	});
}

const deleteSubject = (req, res) => {
	const email = req.email;
	client.query(`DELETE FROM subjects WHERE id = ${req.params.subjectid} AND email = '${email}'`, (err, data) => {
		if (err){
			console.log(err);
			res.status(500).json({
				message: "Database Error!!"
			})
		}
		else{
			res.status(200).json({
				message: "Subject deleted!"
			})
		}
	})
}

const getSubjects = (req, res) => {
	const email = req.email;
	client.query(`SELECT * FROM subjects WHERE email = '${email}'`, (err, data) => {
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
	})
}

module.exports.addSubject = addSubject;
module.exports.deleteSubject = deleteSubject;
module.exports.getSubjects = getSubjects;