"use strict";
/* 获取token的中间件
 * 将获取的token添加到context上
 *  this.token
 *  this.tokenType
 */
const jwt = require("jsonwebtoken");
const cert = global.cert;
const redisClient = global.redisClient;

module.exports = function* getToken (next) {
    // get token from http request header field 'Authorization'.
    let authorization = this.get("authorization");
    if (!authorization) {
        this.status = 401;
        this.body = {
            statusCode: 401,
            reasonPhrase: "Unauthorized",
            description: "there is no token in the http request header field 'Authorization'",
            errorCode: 1000
        };
        return ;
    }

    // get the token and token's type.
    let tokenType = authorization.split(" ")[0];
    let token = authorization.split(" ")[1];

    // 尝试检查token是否能够解析，如果不能的话有很大可能是伪造的。
    let decode = null;
    try {
        decode = jwt.verify(token, cert);
    } catch (e) {
        this.status = 401;
        this.body = {
            statusCode: 401,
            reasonPhrase: "Unauthorized",
            description: "wrong token",
            errorCode: 1001
        };

        return ;
    }

    // 检查token是否过期
    let expires = decode.exp;
    if (expires <= Date.now()) {
        this.status = 400;
        this.body = {
            statusCode: 401,
            reasonPhrase: "Unauthorized",
            description: "token out of date",
            errorCode: 1002
        };

        return ;
    }

    // 在reids里面查找token，如果没有找到的话，应该可以确定是伪造的了。
    // 但也有可能是redis重启之后token全部丢失的原因。
    // 如果存在返回1，如果不存在返回0
    let isTokenExsit = yield redisClient.co_exists(token);

    if (!isTokenExsit) {
        this.status = 400;
        this.body = {
            statusCode: 401,
            reasonPhrase: "Unauthorized",
            description: "token do not exsit, please log in again",
            errorCode: 1003
        };

        return ;
    }

    // 将decode与tokenType添加到context中
    this.token = token;
    this.decode = decode;
    this.tokenType = tokenType;

    yield next;
};
