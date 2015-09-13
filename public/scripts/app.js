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

	Vue.options.debug = true;
	var App = __webpack_require__(10);

	$(function () {
		var app = new App();
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11)


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

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

				var token = JSON.parse(window.localStorage.getItem("token"));
				var expires = token.exp;

				if (expires <= Date.now()) {
					this.currentView = "authentication";
				} else {
					this.currentView = "panel"
				}
			},
			components: {
				authentication: __webpack_require__(12),
				panel: __webpack_require__(15)
			}
		});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13)
	module.exports.template = __webpack_require__(14)


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {
			data: function () {
				return {
					user: {
						username: "",
						password: ""
					},
					hasError: false
				};
			},
			methods: {
				logIn: function (e) {
					var self = this;

					e.preventDefault();

					var loggingIn = $.ajax({
						url: "/authentication",
						data: this.$data.user,
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

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"my-login\">\n\t\t<form class=\"form-horizontal\">\n\t\t\t<div v-class=\"has-error: hasError\" class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<input v-model=\"user.username\" v-on=\"focus: focusIn\" type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"用户名\" name=\"username\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div v-class=\"has-error: hasError\" class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<input v-model=\"user.password\" v-on=\"focus: focusIn\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"密码\" name=\"password\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<button v-on=\"click: logIn\" type=\"submit\" class=\"btn btn-primary btn-default btn-block\">登陆</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</form>\n\t</div>";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16)
	module.exports.template = __webpack_require__(35)


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	        created: function () {
	            this.$on("classifications-changed", function (vm) {
	                // 接受到了navigation的通知之后，再通知contents切换view
	                this.$broadcast("classifications-changed", vm);
	            });
	        },
	        components: {
	            navigation: __webpack_require__(17),
	            contents: __webpack_require__(20)
	        }
	    };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18)
	module.exports.template = __webpack_require__(19)


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {
	        data: function () {
	            var user =  JSON.parse(window.localStorage.getItem("token")).user;
	            return {
	                classifications: [
	                    // the index of 0 is the default.
	                    {name:"Articles", href: "#/articles"},
	                    {name:"Authors", href: "#/authors"},
	                    {name:"Tags", href: "#/tags"}
	                ],
	                dropdownMenu: [
	                    {name:"Profile", href: "#/profile"},
	                    {name:"Settings", href: "#/settings"},
	                ],
	                user: user
	            };
	        },
	        ready: function () {
	            this.$.links[0].$el.click(); // 默认navigation中的第一个项选中。
	        },
	        methods: {
	            onClick: function (e) {
	                // when one of classifications was clicked , change the status.
	                // get the current son component instance.
	                var links = this.$.links;
	                var vm = null;
	                links.forEach(function (current, index, array) {
	                    if (current.$el === e.currentTarget) vm = current;
	                });

	                // 通知panel
	                this.$dispatch("classifications-changed", vm);

	                // 移除其他的classifications的active类
	                var cur = e.currentTarget;
	                for (var i = 0; i < links.length; i++) {
	                    var link = links[i].$el;
	                    if (cur !== link) {
	                        link.removeAttribute("class");
	                    } else {
	                        cur.setAttribute("class", "active");
	                    }
	                }
	            },
	            logOut: function (e) {
	                var self = this;

	                // 取得存储的token，并且添加到http request的Authorization首部字段。
	                var token = JSON.parse(window.localStorage.getItem("token")).token;

	                var loggingOut = $.ajax({
	                    url: "/authentication",
	                    dataType: "json",
	                    method: "DELETE",
	                    headers: {
	                        Authorization: "jwt " + token
	                    }
	                });

	                loggingOut
	                    .done(function (data) {
	                        // 服务器端退出成功，现将前端的token删除，并且切换到登录界面
	                        window.localStorage.removeItem("token");
	                        self.$dispatch("logout-succeed");
	                    })
	                    .fail(function () {
	                        alert("退出失败");
	                    });
	            }
	        }
	    };

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<nav class=\"navbar navbar-default navbar-fixed-top\">\n        <div class=\"container\">\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navigation\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" href=\"/articles\">Home</a>\n            </div>\n            <div class=\"collapse navbar-collapse\" id=\"navigation\">\n                <ul class=\"nav navbar-nav\">\n                    <li v-on=\"click: onClick\" v-ref=\"links\" v-repeat=\"item in classifications\">\n                        <a v-attr=\"href: item.href\" v-text=\"item.name\"></a>\n                    </li>\n                </ul>\n                <ul class=\"nav navbar-nav navbar-right\">\n                    <li class=\"dropdown\">\n                        <a\n                            class=\"dropdown-toggle\"\n                            data-toggle=\"dropdown\"\n                            role=\"button\"\n                            aria-haspopup=\"true\"\n                            aria-expanded=\"false\">\n                            <span v-text=\"user.pen_name\"></span>\n                            <span class=\"caret\"></span>\n                        </a>\n                        <ul class=\"dropdown-menu\">\n                            <li v-repeat=\"menu in dropdownMenu\">\n                                <a v-attr=\"href: menu.href\" v-text=\"menu.name\"></a>\n                            </li>\n                            <li role=\"separator\" class=\"divider\"></li>\n                            <li><a v-on=\"click: logOut\">Log out</a></li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </nav>";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21)
	module.exports.template = __webpack_require__(34)


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	        data: function () {
	            return {
	                currentView: ""
	            };
	        },
	        created: function () {
	            var self = this;
	            this.$on("classifications-changed", function (vm) {
	                var viewName = vm.item.name.toLowerCase();
	                self.currentView = viewName;
	            });
	        },
	        ready: function (){
	                
	        },
	        components: {
	            articles: __webpack_require__(22),
	            authors: __webpack_require__(28),
	            tags: __webpack_require__(31)
	        }
	    };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23)
	module.exports.template = __webpack_require__(27)


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	        data: function () {
	            return {
	                recentArticles: [

	                ]
	            };
	        },
	        methods: {
	            getRecentArticles: function (e) {
	                var self = this;
	                // get the recent 5 articles.
	                var getting = $.ajax({
	                    url: "/articles",
	                    data: {
	                        sort: "-createAt",
	                        limit: 5,
	                        offset: 0
	                    },
	                    dataType: "json", // set 'Accepts' header field
	                    method: "GET" // set http method
	                });

	                getting
	                    .done(function (data) {
	                        self.recentArticles = data;
	                        self.$emit("recentArticlesLoaded");
	                    })
	                    .fail(function (error) {
	                        console.log(error);
	                    });
	            }
	        },
	        created: function () {
	            this.getRecentArticles();
	        },
	        ready: function () {

	        },
	        components: {
	            editor: __webpack_require__(24),
	            recentArticleItem: __webpack_require__(38)
	        },
	        filters: {
	            timeFormat: function (value) {
	                var time = new Date(value);
	                var timeString = [
	                    time.getFullYear(),
	                    time.getMonth() + 1,
	                    time.getDate()
	                ].join("-");

	                return timeString;
	            }
	        }
	    };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25)
	module.exports.template = __webpack_require__(26)


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {
	        modal: $("#new-article-modal"),
	        data: function () {
	            return {
	                editor: null, // 用于保存编辑器实例
	                newArticle: {
	                    title: "",
	                    tag: "",
	                    content: "" // 编辑器的内容，既是文章的内容
	                }
	            };
	        },
	        methods: {
	            createNewArticle: function (e) {
	                this.modal.modal("hide");
	            }
	        },
	        created: function () {
	            // hackthis
	            var self = this;

	            // 监听上传事件
	            this.$on("upload", function () {
	                console.log(this.content);
	            });
	        },
	        ready: function () {
	            // hackthis
	            var self = this;

	            // 实例化编辑器，并且设置自定义的配置文件
	            this.editor = CKEDITOR.replace("editor", {
	                customConfig: "/scripts/ckeditor_config.js"
	            });

	            // 在初始化编辑器之后将this.content渲染到编辑器中
	            // this.editor.setData(this.newArticle.content);

	            // 在编辑器的内容改变时，自动更新this.content
	            this.editor.on("change", function (e) {
	                self.content = e.editor.getData();
	            });

	            // 将modal添加到当前的组建实例上，以便于访问
	            this.modal = $("#new-article-modal");

	            // repaire ckeditor inside bootstrap modals
	            $.fn.modal.Constructor.prototype.enforceFocus = function() {
	                $( document )
	                    .off( 'focusin.bs.modal' ) // guard against infinite focus loop
	                    .on( 'focusin.bs.modal', $.proxy( function( e ) {
	                        if (
	                            this.$element[ 0 ] !== e.target && !this.$element.has( e.target ).length
	                            // CKEditor compatibility fix start.
	                            && !$( e.target ).closest( '.cke_dialog, .cke' ).length
	                            // CKEditor compatibility fix end.
	                        ) {
	                            this.$element.trigger( 'focus' );
	                        }
	                    }, this ) );
	            };
	        }
	    };

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<div\n        class=\"modal fade\"\n        id=\"new-article-modal\"\n        tabindex=\"-1\"\n        role=\"dialog\"\n        aria-labelledby=\"new-article-modal-title\"\n        aria-describedby=\"create new article\">\n        <div\n            class=\"modal-dialog modal-lg\"\n            role=\"document\"\n            aria-hidden=\"true\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button\n                        type=\"button\"\n                        class=\"close\"\n                        data-dismiss=\"modal\"\n                        aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    <h4 class=\"modal-title\" id=\"new-article-modal-title\">\n                        Create a new article\n                    </h4>\n                </div>\n                <div class=\"modal-body\">\n                    <input\n                        type=\"text\"\n                        v-model=\"newArticle.title\"\n                        maxlength=\"120\"\n                        class=\"new-article-title\"\n                        id=\"new-article-title\"\n                        placeholder=\"标题\">\n                    <input\n                        type=\"text\"\n                        v-model=\"newArticle.tag\"\n                        maxlength=\"120\"\n                        class=\"new-article-tag\"\n                        id=\"new-article-tag\"\n                        placeholder=\"添加相关标签\">\n                    <!-- editor begin -->\n                    <textarea name=\"editor\" id=\"editor\"></textarea>\n                    <!-- editor end -->\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                    <button v-on=\"click: createNewArticle\" type=\"button\" class=\"btn btn-primary\">Save</button>\n                </div>\n            </div>\n        </div>\n    </div>";

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container contents-articles-container\">\n        <div class=\"row\">\n            <div class=\"col-md-2\">\n                <div class=\"btn-group-vertical btn-group-sm\" role=\"group\" aria-label=\"Vertical button group\">\n                    <button\n                        v-on=\"click: getRecentArticles\"\n                        id=\"getRecentArticles\"\n                        class=\"btn btn-default\"\n                        type=\"button\">\n                        Recent 5\n                    </button>\n                    <button\n                        id=\"new\"\n                        class=\"btn btn-default\"\n                        data-toggle=\"modal\"\n                        data-target=\"#new-article-modal\"\n                        type=\"button\">\n                        New\n                    </button>\n                    <button\n                        type=\"button\"\n                        class=\"btn btn-default\">\n                        Button\n                    </button>\n                </div>\n            </div>\n\n            <!-- recent 5 articles -->\n            <div class=\"col-md-9\">\n                <div class=\"row\">\n                    <div class=\"col-md-5\">\n                        <recent-article-item\n                            wait-for=\"recent-articles-loaded\"\n                            v-repeat=\"article in recentArticles\">\n                        </recent-article-item>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <editor></editor>\n    </div>";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29)
	module.exports.template = __webpack_require__(30)


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {

	    };

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <p>\n                    authors vm\n                </p>\n            </div>\n        </div>\n    </div>";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32)
	module.exports.template = __webpack_require__(33)


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = {

	    };

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <p>\n                    tags vm\n                </p>\n            </div>\n        </div>\n    </div>";

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<component is=\"{{currentView}}\"></component>";

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<div>\n        <navigation v-ref=\"navigation\"></navigation>\n        <contents v-ref=\"content\"></contents>\n    </div>";

/***/ },
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39)
	module.exports.template = __webpack_require__(40)


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = {
	        methods: {
	            onClick: function (e) {
	                
	            }
	        }
	    };

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<div class=\"media\">\n        <div class=\"media-body\">\n            <h4 class=\"media-heading\">\n                <span v-text=\"article.title\"></span>\n                <span v-text=\"article.tag\"></span>\n                <span v-text=\"article.createAt | timeFormat\"></span>\n            </h4>\n            <span v-text=\"article.author\"></span>\n        </div>\n        <div class=\"media-right media-middle\">\n            <button\n                v-on=\"click: onClick\"\n                type=\"button\"\n                class=\"btn btn-default btn-xs\">\n                <span class=\"glyphicon glyphicon-option-horizontal\" aria-hidden=\"true\"></span>\n            </button>\n        </div>\n    </div>";

/***/ }
/******/ ]);