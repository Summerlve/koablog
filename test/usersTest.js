"use strict";

const request = require("request");
const User = require("./User");
const rootUser = new User("rootTest", "123456", "root");
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsImV4cCI6MTQ0NzQyMjMxODQ2OCwiaWF0IjoxNDQ2ODE3NTE4fQ.WSk7ebjlnjmQ8S1GZSEKHjZg1AiaX0dP00r4gffsGIM";

const authentications = "http://localhost:8080/authentications";

const deleteUser = "http://localhost:8080/authors/4";

const createUser = "http://localhost:8080/authors/";

request
    .post(
        {
            url: createUser,
            headers: {
                Authorization: "jwt " + token,
                Accept: "application/json"
            },
            form: {
                username: "author5@test.com",
                password: "123456",
                penName: "authorTest-5",
                avatar: null,
                introduce: null,
                groupId: 3
            }
        },
        function (err, httpResponse, body) {
            if (err) {
                console.error(err);
                return ;
            }

            console.log(body);
        }
    );
