const logger = (req, res, next) => {
	const {method, url} = req;
	const current_datetime = new Date();
  	const formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
	console.log(method, url, formatted_date);
	next();
}

module.exports = logger;