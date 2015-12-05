"use strict";

const request = require("request");
const host = process.argv[2];
const account = require("./account.json");

let roots;
let authors;

for (let i of account) {
    if (i.group === "root") roots = i.users;
    if (i.group === "author") authors = i.users;
}




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
