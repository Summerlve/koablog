

var authentication = require("./components/authentication.vue");

var App = Vue.extend({
	el: function () {
		return "body";
	},
	ready: function () {
		var token = window.localStorage.getItem("token");
		console.log(token);
	},
	data: function () {
		return {
			currentView: "authentication"
		}
	},
	components: {
		authentication: authentication
	}
});

$(function () {
	var app = new App();
});



