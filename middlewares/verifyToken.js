"use strict";
/* this middlewares is used to get the token
 * and attach the token to context
 *  this.token
 *  this.tokenType
 */
const jwt = require("jsonwebtoken");
const configs = require("../configs/configs");
const cert = configs.jwt.cert;
const redisClient = configs.redisClient;

module.exports = function* getToken (next) {
    // first: get token from http request header field 'Authorization'.
    // if have no info then get token from querystring 'Authorization' (only /files needs to get token from querystring)
    let authorization = this.get("Authorization");

    if (!authorization) {
        authorization = this.query.Authorization;

        if (!authorization) {
            this.status = 401;
            this.body = {
                statusCode: 401,
                reasonPhrase: "Unauthorized",
                description: "there is no token in both the http request header field 'Authorization' and query string 'Authorization'",
                errorCode: 1000
            };
            return ;
        }
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
        this.status = 401;
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
        this.status = 401;
        this.body = {
            statusCode: 401,
            reasonPhrase: "Unauthorized",
            description: "token do not exists, please log in again",
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
