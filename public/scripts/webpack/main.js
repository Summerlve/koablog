var App = require("./components/app.vue");
var router = require("./routes.js");

$(function () {
	var app = new App();
	router.init();
});
