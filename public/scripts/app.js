/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var App = __webpack_require__(4);
	var router = __webpack_require__(20);

	$(function () {
		var app = new App();
		router.init();
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5)


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Vue.extend({
			el: function () {
				return "body";
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
			data: function () {
				return {
					currentView: ""
				}
			},
			components: {
				authentication: __webpack_require__(6),
				panel: __webpack_require__(9)
			}
		});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7)
	module.exports.template = __webpack_require__(8)


/***/ },
/* 7 */
/***/ function(module, exports) {

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
				},
				focusIn: function (e) {
					// when type in username and password , the error alert should disappear
					e.targetVM.hasError = false;
				}
			}
		};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"my-login\">\n\t\t<form class=\"form-horizontal\">\n\t\t\t<div v-class=\"has-error: hasError\" class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<input v-model=\"username\" v-on=\"focus: focusIn\" type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"用户名\" name=\"username\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div v-class=\"has-error: hasError\" class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<input v-model=\"password\" v-on=\"focus: focusIn\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"密码\" name=\"password\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<button v-on=\"click: submit\" type=\"submit\" class=\"btn btn-primary btn-default btn-block\">登陆</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</form>\n\t</div>";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10)
	module.exports.template = __webpack_require__(11)


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	        components: {
	            navigation: __webpack_require__(17),
	            content: __webpack_require__(26)
	        }
	    };

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<navigation></navigation>\n    <content></content>";

/***/ },
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18)
	module.exports.template = __webpack_require__(19)


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {
	        data: function () {
	            return {
	                classifications: [
	                    {name:"Authors", href: "#/authors"},
	                    {name:"Articles", href: "#/articles"},
	                    {name:"Tags", href: "#/tags"}
	                ]
	            };
	        },
	        methods: {
	            onClick: function (e) {
	                var links = this.$.links;

	                for (var i = 0; i < links.length; i++) {
	                    var cur = links[i].$el;
	                    if (e.currentTarget !== cur) {
	                        cur.removeAttribute("class");
	                    } else {
	                        e.currentTarget.setAttribute("class", "active");
	                    }
	                }
	            }
	        }
	    };

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<nav class=\"navbar navbar-default navbar-fixed-top\">\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n            <div class=\"col-md-11 col-md-offset-1\">\n                <div class=\"navbar-header\">\n                    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navigation\" aria-expanded=\"false\">\n                        <span class=\"sr-only\">Toggle navigation</span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                    </button>\n                    <a class=\"navbar-brand\" href=\"/articles\">Home</a>\n                </div>\n                <div class=\"collapse navbar-collapse\" id=\"navigation\">\n                    <ul class=\"nav navbar-nav\">\n                        <li v-on=\"click: onClick\" v-ref=\"links\" v-repeat=\"item in classifications\">\n                            <a href=\"{{item.href}}\">{{item.name}}</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</nav>";

/***/ },
/* 20 */
/***/ function(module, exports) {

	var router = Router({
	    "/authors": function () {
	        console.log("authors");
	    },
	    "/articles": function () {
	        console.log("articles");
	    }
	});

	module.exports = router;


/***/ },
/* 21 */,
/* 22 */
/***/ function(module, exports) {

	

/***/ },
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27)
	module.exports.template = __webpack_require__(28)


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	        data: function () {
	            return {
	                currentView: "articles"
	            };
	        },
	        components: {
	            articles: __webpack_require__(22),
	            authors: __webpack_require__(30),
	            tags: __webpack_require__(32)
	        }
	    };

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\n        <div class=\"row\">\n\n        </div>\n    </div>";

/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports) {

	

/***/ },
/* 31 */,
/* 32 */
/***/ function(module, exports) {

	

/***/ }
/******/ ]);