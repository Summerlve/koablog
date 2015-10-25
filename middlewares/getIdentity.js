"use strict";
/* 识别group的中间件
 * 将获取的group_id与user_id添加到context上
 * this.groupId
 * this.userId
 */
let MD5 = require("md5");
let jwt = require("jsonwebtoken");
let User = require("../models/User");
let cert = global.cert;

// identity
function* getIdentity (next) {
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
