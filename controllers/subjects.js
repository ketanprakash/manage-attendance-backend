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

module.exports.addSubject = addSubject;