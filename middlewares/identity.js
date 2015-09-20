"use strict";
/* 识别group的中间件
 * 将获取的group_id添加到context上
 * this.groupId
 */
let MD5 = require("md5");
let jwt = require("jsonwebtoken");
let GroupToUser = require("../models/Group").GroupToUser;
let cert = global.cert;

// identity
function* identity (next) {
	// get token from getToken middleware
	let token = this.token;

	let decode = jwt.verify(token, cert);
	let userId = decode.iss;

	let userGroup = yield GroupToUser
							.find({
								attributes: ["group_id"],
								where: {
									user_id: userId
								}
							});

	// 将groupId添加到context上
	this.groupId = userGroup.group_id;

	yield next;
}

module.exports = identity;
