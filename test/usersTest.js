"use strict";

const request = require("request");
const User = require("./User");
const rootUser = new User("rootTest", "123456", "root");
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9." +
                "eyJpc3MiOjMsImV4cCI6MTQ0NjkwMDE1MTg2NiwiaWF0IjoxNDQ2Mjk1MzUxfQ." +
                "mSSbFVQfNtr66tl6BzSRfh2UFcWPnwCvY_WsDPdK21s";

const authentications = "http://localhost:8080/authentications";

const deleteUser = "http://localhost:8080/authors/4"

request
    .del(
        {
            url: deleteUser,
            headers: {
                Authorization: "jwt " + token,
                Accept: "application/json"
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
