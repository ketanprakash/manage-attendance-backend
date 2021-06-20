const client = require('../configs/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = (req, res) => {
	// {
	// 	firstname: "First", 
	// 	lastname: "Last",
	// 	email: "email@something.com",
	// 	password: "password"
	// }
	const { firstname, lastname, email, password } = req.body;
	console.log(firstname, lastname, email, password);
	//check if the email already exists
	client.query(`SELECT * FROM users WHERE email = '${email}'`, (err, data) => {
		if (err){
			res.status(500).json({
				message: "Database Error!"
			})
		}
		else{
			if (data.rows.length === 0){
				bcrypt.hash(password, 9, (err, hash) => {
					if (err){
						res.status(500).json({
							message: "Hashing Error!"
						});
					}
					else{
						client.query(`INSERT INTO users(firstname, lastname, email, password) VALUES('${firstname}', '${lastname}','${email}','${hash}')`);
						console.log(hash);
						const token = jwt.sign({email: email},`${process.env.SECRET_KEY}`);
						res.status(200).json({
							message: "Successfully added user into database!",
							token
						});
					}
				});
			}
			else{
				res.status(500).json({
					message: "The email already exists"
				})
			}
		}
		
	})
	// res.status(200).send("Data received");
}

const signin = (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	client.query(`SELECT * FROM users WHERE email = '${email}'`, (err, data) => {
		if (err){
			console.log(err);
			res.status(500).json({
				message: "Database error!"
			});
		}
		else{
			if (data.rows.length === 0){
				res.status(404).json({
					message: "Email id does not exist"
				})
			}
			else{
				bcrypt.compare(password, data.rows[0].password, (err, result) => {
					if (err){
						console.log(err);
						res.status(500).json({
							message: "Hashing comparison error"
						})
					}
					else{
						if (result){
							const token = jwt.sign({email: email},`${process.env.SECRET_KEY}`);
							res.status(200).json({
								message: "Logged in successfully",
								token
							});
						}
						else{
							res.status(404).json({
								message: "Password is incorrect"
							});
						}
					}
				})
			}
		}
	})
	// res.status(200).send("Data received");
}

module.exports.signup = signup;
module.exports.signin = signin;