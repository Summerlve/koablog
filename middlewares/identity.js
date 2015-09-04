var MD5 = require("md5");
var jwt = require("jsonwebtoken");
var GroupToUser = require("../models/Group").GroupToUser;
var cert = global.cert;

// identity
function* identity (next) {
	// get token from http header field "authorization"
	var token = this.get("authorization").split(" ")[1];

	if (!token) {
		this.status = 401;
		return ;
	}

	var decode = jwt.verify(token, cert);
	var userId = decode.id;

	var group = yield GroupToUser
							.find({
								attributes: ["group_id"],
								where: {
									user_id: userId
								}
							});
	this.groupId = group.group_id;

	yield next;
}

module.exports = identity;
