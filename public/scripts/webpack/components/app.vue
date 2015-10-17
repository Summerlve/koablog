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
			// hackthis
			var self = this;

			this.$on("login-succeed", function () {
				self.currentView = "panel";
			});

			this.$on("logout-succeed", function () {
				self.currentView = "authentication";
			});
		},
		ready: function () {
			// hackthis
			var self = this;

			// check the token
			if (!window.localStorage.getItem("token")) {
				this.currentView = "authentication";
				return ;
			}

			// check the token is expirse
			var token = JSON.parse(window.localStorage.getItem("token")).token;

			var verify = $.ajax({
				url: "/authentication",
				dataType: "json",
				method: "PUT",
				headers: {
					Authorization: "jwt " + token
				}
			});

			verify
				.done(function (data) {
					self.currentView = "panel";
				})
				.fail(function (error) {
					self.currentView = "authentication";
				});
		},
		components: {
			authentication: require("./authentication.vue"),
			panel: require("./panel.vue")
		}
	});
</script>
