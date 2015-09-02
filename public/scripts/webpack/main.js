var authentication = require("./components/authentication.vue");
var loading = require("./components/loading.vue");
var panel = require("./components/panel.vue");

var App = Vue.extend({
	el: function () {
		return "body";
	},
	ready: function () {
		if (!window.localStorage.getItem("token")) {
			this.currentView = "authentication";
			return ;
		}

		var token = JSON.parse(window.localStorage.getItem("token"));
		var expires = token.exp;

		if (expires <= Date.now()) {
			this.currentView = "authentication";
		} else {
			this.currentView = "panel"
		}
	},
	data: function () {
		return {
			currentView: "loading"
		}
	},
	components: {
		authentication: authentication,
		loading: loading,
		panel: panel
	}
});

$(function () {
	var app = new App();
});
