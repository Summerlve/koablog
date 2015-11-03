"use strict";
// 401 handler
module.exports = function* (next) {
    yield next;
    if (this.status !== 401) return ;
    this.status = 401;

    switch (this.accepts("html", "json")) {
		case "html":
			this.body = this.body || "Unauthorized";
			break;
		case "json":
			this.body = this.body || {
				statusCode: 401,
				reasonPhrase: "Unauthorized"
			};
			break;
		default:
			this.type = "text";
			this.body = this.body || "401 Unauthorized";
	}
};
