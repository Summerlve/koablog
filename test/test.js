"use strict";

let a = Promise.resolve(1);

a
    .then(
        (value) => {
            console.log(value);
            return value
        }
    )
    .then(
        (value) => {
            console.log(value);
        }
    );
