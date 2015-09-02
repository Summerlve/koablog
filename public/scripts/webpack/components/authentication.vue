<template>
	<div class="my-login">
		<form class="form-horizontal">
			<div v-class="has-error: hasError" class="form-group">
				<div class="row">
					<div class="col-sm-offset-1 col-sm-10">
						<input v-model="username" type="text" class="form-control" id="username" placeholder="用户名" name="username">
					</div>
				</div>
			</div>
			<div v-class="has-error: hasError" class="form-group">
				<div class="row">
					<div class="col-sm-offset-1 col-sm-10">
						<input v-model="password" type="password" class="form-control" id="password" placeholder="密码" name="password">
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="row">
					<div class="col-sm-offset-1 col-sm-10">
						<button v-on="click: submit" type="submit" class="btn btn-primary btn-default btn-block">登陆</button>
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
			submit: function (e) {
				var self = this;

				e.preventDefault();

				var posting = $.post(
					"/authentication",
					this.$data,
					"json"
				);

				posting
					.done(function (data) {
						self.$el.querySelector("button").blur();
						window.localStorage.setItem("token", JSON.stringify(data));
					})
					.fail(function (error) {
						self.hasError = true;
						self.$el.querySelector("button").blur();
					});
			}
		}
	};
</script>
