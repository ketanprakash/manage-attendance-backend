const jwt = require("jsonwebtoken");
const client = require("../configs/db");

const verifyToken = (req, res, next) => {
	const token = req.headers.token;
	console.log(req.headers.token);
	const payload = jwt.verify(token, `${process.env.SECRET_KEY}`, (err, decoded) => {
		if (err) {
			console.log(err);
			res.status(500).json({
				message: "Error in decodeding the token"
			})
		}
		else {
			console.log(decoded.email);
			req.email = decoded.email;
			next();
		}
	});
}

module.exports.verifyToken = verifyToken;