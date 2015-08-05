var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "123456cxzse$",
	database: "koaBlog"
});

connection.connect();

connection.query("select * from admin", function (err, rows, fields) {
//	rows.forEach(function (currentValue, index) {
//		console.log(currentValue);
//	}, this);
	if (err) throw err;
	console.log(rows);
});

connection.end();