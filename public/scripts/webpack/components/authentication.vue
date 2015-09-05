<template>
	<div class="my-login">
		<form class="form-horizontal">
			<div v-class="has-error: hasError" class="form-group">
				<div class="row">
					<div class="col-sm-offset-1 col-sm-10">
						<input v-model="username" v-on="focus: focusIn" type="text" class="form-control" id="username" placeholder="用户名" name="username">
					</div>
				</div>
			</div>
			<div v-class="has-error: hasError" class="form-group">
				<div class="row">
					<div class="col-sm-offset-1 col-sm-10">
						<input v-model="password" v-on="focus: focusIn" type="password" class="form-control" id="password" placeholder="密码" name="password">
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="row">
					<div class="col-sm-offset-1 col-sm-10">
						<button v-on="click: logIn" type="submit" class="btn btn-primary btn-default btn-block">登陆</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				username: "",
				password: "",
				hasError: false
			};
		},
		methods: {
			logIn: function (e) {
				var self = this;

				e.preventDefault();

				var loggingIn = $.ajax({
					url: "/authentication",
					data: this.$data,
					dataType: "json",
					method: "POST"
				});

				loggingIn
					.done(function (data) {
						self.$el.querySelector("button").blur();
						window.localStorage.setItem("token", JSON.stringify(data));

						// 通知app，登录成功，切换到panel。
						self.$dispatch("login-succeed");
					})
					.fail(function (error) {
						self.hasError = true;
						self.$el.querySelector("button").blur();
					});
			},
			focusIn: function (e) {
				// when type in username and password , the error alert should disappear
				e.targetVM.hasError = false;
			}
		}
	};
</script>
