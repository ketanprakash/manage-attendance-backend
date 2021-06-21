const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.headers.Authorization;
	console.log(req.headers.Authorization);
	jwt.verify(token, `${process.env.SECRET_KEY}`, (err, decoded) => {
		if (err) {
			console.log(err);
			res.status(500).json({
				message: "Error in decoding the token"
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