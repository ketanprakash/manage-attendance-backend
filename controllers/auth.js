const client = require('../configs/db');
const signup = (req, res) => {
	// {
	// 	firstname: "First", 
	// 	lastname: "Last",
	// 	email: "email@something.com",
	// 	password: "password"
	// }
	const { firstname, lastname, email, password } = req.body;
	console.log(firstname, lastname, email, password);
	res.status(200).send("Data received");
}

const signin = (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	res.status(200).send("Data received");
}

module.exports.signup = signup;
module.exports.signin = signin;