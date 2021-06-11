const { Client } = require('pg');
const client = new Client({
	connectionString: "postgres://eqsubpgh:T573eKx0LeLx7zWW4i4hsQL0qg5ZYwmd@john.db.elephantsql.com/eqsubpgh"
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