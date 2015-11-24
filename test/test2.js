"use strict";

function superClass () {}
function subClass () {}

Object.setPrototypeOf(subClass.prototype, superClass.prototype);

console.log(subClass.prototype.constructor);
