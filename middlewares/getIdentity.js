"use strict";
/* 识别group的中间件
 * 将获取的group_id与user_id添加到context上
 * this.groupId
 * this.userId
 */
const MD5 = require("md5");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cert = global.cert;

// identity
function* getIdentity (next) {
	// get token from getToken middleware
	let decode = this.decode;

	// get user_id from token
	let userId = decode.iss;

	let user = yield User.find({
		attributes: ["group_id"],
		where: {
			id: userId
		}
	});

	// 将groupId和userId添加到context上
	this.groupId = user.group_id;
	this.userId = userId;

	yield next;
}

module.exports = getIdentity;
