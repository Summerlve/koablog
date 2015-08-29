var demo1 = new Vue({
	el: "#demo1",
	data: {
		msg: 1
	}
});
//нт╡ш
demo1.msg = "hahaha";
console.log(demo1.$el.textContent.trim());
demo1.$nextTick(function () {
	console.log(this.$el.textContent.trim());
});
