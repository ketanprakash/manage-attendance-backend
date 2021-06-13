const { Client } = require('pg');

const client = new Client({
	user: process.env.PGUSER,
  	host: process.env.PGHOST,
  	database: process.env.PGDATABASE,
  	password: process.env.PGPASSWORD,
  	port: process.env.PGPORT
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