"use strict";
$(window).load(function () {	
	$(".tag").get(0)
		.on("mouseenter", function (event) {
			console.log(event.target);
			$(event.target).css({y: 30});
		
		});	
});