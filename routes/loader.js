// load router
var routers = [];
routers.push(require("./admin"));
routers.push(require("./articles"));
routers.push(require("./authors"));
routers.push(require("./tags"));
routers.push(require("./users"));
routers.push(require("./about"));

module.exports = function (app) {
	routers.forEach(function (router) {
		app.use(router);
	});
}
