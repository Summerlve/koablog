"use strict";

function superClass (){}

function subClass () {}

console.log(subClass.prototype.constructor === subClass);

subClass.prototype = Object.create(superClass.prototype);

console.log(subClass.prototype.constructor);

