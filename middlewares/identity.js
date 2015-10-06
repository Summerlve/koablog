"use strict";
/* 识别group的中间件
 * 将获取的group_id添加到context上
 * this.groupId
 */
let MD5 = require("md5");
let jwt = require("jsonwebtoken");
let User = require("../models/User");
let cert = global.cert;

// identity
function* identity (next) {
	// get token from getToken middleware
	let token = this.token;

	let decode = null;
    try {
        decode = jwt.verify(token, cert);
    } catch (e) {
        this.status = 400;
        this.body = {
            status_code: 400,
            error_description: "wrong token"
        }

        return ;
    }

	let userId = decode.iss;

	let user = yield User
							.find({
								attributes: ["group_id"],
								where: {
									id: userId
								}
							});

	// 将groupId添加到context上
	this.groupId = user.group_id;

	yield next;
}

module.exports = identity;
