// load router
var routes = [];
routes.push(require("./login"));
routes.push(require("./articles"));
routes.push(require("./authors"));
routes.push(require("./tags"));
routes.push(require("./users"));

module.exports = function (app) {
	routes.forEach(function (router) {
		app.use(router);
	});
}