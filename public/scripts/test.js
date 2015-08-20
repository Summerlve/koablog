var token = "";

$.ajax({
	url: "/authentication",
	cache: false,
	data: {
		username: "dzxx0563zh@126.com",
		password: "123456"
	},
	method: "POST",
	success: function (data, status, jqXHR) {
		token = data.access_token;

		$.ajaxSetup({
			headers: {
				"Authorization": "jwt " + token
			}
		});
		
		$.ajax({
			url: "/users",
			cache: false,
			method: "POST",
			success: function (data) {
				console.log(data);
			},
			error: function (xhr, status, reason) {
				console.log(status)
			}
		});
	},
	error: function (jqXHR, status, reasonPhrase) {
		
	}
});
