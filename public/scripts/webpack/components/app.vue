<script>
	module.exports = Vue.extend({
		el: function () {
			return "body";
		},
		data: function () {
			return {
				currentView: ""
			}
		},
		created: function () {
			var self = this;
			this.$on("login-succeed", function () {
				self.currentView = "panel";
			});
		},
		ready: function () {
			// check the token
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
		components: {
			authentication: require("./authentication.vue"),
			panel: require("./panel.vue")
		}
	});
</script>
