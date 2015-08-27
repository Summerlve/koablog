var demo2 = new Vue({
	el: "#demo2",
	data: {
		users: [
			{
				name: "zhanghao",
				email: "dzxx0563zh@126.com"
			},
			{
				name: "test",
				email: "xzsf2012zh@gmail.com"
			}
		]
	},
	components: {
		profile: {
			template: "<li> {{name}} : {{email}}</li>"
		}
	}
}); 

