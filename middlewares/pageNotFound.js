// 全部的404处理都在这里
module.exports = function* pageNotFound (next) {
	yield next;
	
	if (404 !== this.status) return ;
	
	this.status = 404;
	
	switch (this.accepts("html", "json")) {
		case "html":
			this.body = this.body || "404 Not Found .....";
			break;
		case "json":
			this.body = {
				statusCode: 404,
				reasonPhrase: "Not Found"
			};
			break;	
		default:
			this.type = "text";
			this.body = this.body || "404 Not Found";
	}
};