"use strict";
// test router '/users'
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");

describe("get users info from configs.json", function () {
    it("get root", function () {
        assert.deepStrictEqual(configs.users.root.length, 1, "root users's length must be one");
    });
});




// request
//     .post(
//         {
//             url: createUser,
//             headers: {
//                 Authorization: "jwt " + token,
//                 Accept: "application/json"
//             },
//             form: {
//                 username: "author5@test.com",
//                 password: "123456",
//                 penName: "authorTest-5",
//                 avatar: null,
//                 introduce: null,
//                 groupId: 3
//             }
//         },
//         function (err, httpResponse, body) {
//             if (err) {
//                 console.error(err);
//                 return ;
//             }
//
//             console.log(body);
//         }
//     );
