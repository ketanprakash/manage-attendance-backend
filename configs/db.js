const { Client } = require('pg');
const client = new Client({
	connectionString: process.env.PGURL
})

client.connect((err) => {
	if (err) {
		console.log(err);
	}
	else{
		console.log("Database connected successfully");
	}
});

module.exports = client;