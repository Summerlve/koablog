"use strict";
// the pageNotFound middleware is handle all of the 404 error for whole situation.

module.exports = function* pageNotFound (next) {
	yield next;

	if (this.status !== 404) return ;
	this.status = 404;

	switch (this.accepts("html", "json")) {
		case "html":
			this.body = this.body || "<h1>404 Not Found</h1>";
			break;
		case "json":
			this.body = this.body || {
				statusCode: 404,
				reasonPhrase: "Not Found"
			};
			break;
		default:
			this.type = "text";
			this.body = this.body || "404 Not Found";
	}
};
