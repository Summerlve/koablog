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
	var App = __webpack_require__(11);

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
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12)


/***/ },
/* 12 */
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

				// check the token is expirse
				var token = JSON.parse(window.localStorage.getItem("token")).token;

				var verify = $.ajax({
					url: "/authentications",
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
				authentication: __webpack_require__(13),
				panel: __webpack_require__(16)
			}
		});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14)
	module.exports.template = __webpack_require__(15)


/***/ },
/* 14 */
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
						url: "/authentications",
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
/* 15 */
/***/ function(module, exports) {

	module.exports = "<div class=\"my-login\">\n\t\t<form class=\"form-horizontal\">\n\t\t\t<div v-class=\"has-error: hasError\" class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<input v-model=\"user.username\" v-on=\"focus: focusIn\" type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"用户名\" name=\"username\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div v-class=\"has-error: hasError\" class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<input v-model=\"user.password\" v-on=\"focus: focusIn\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"密码\" name=\"password\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-offset-1 col-sm-10\">\n\t\t\t\t\t\t<button v-on=\"click: logIn\" type=\"submit\" class=\"btn btn-primary btn-default btn-block\">登陆</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</form>\n\t</div>";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17)
	module.exports.template = __webpack_require__(39)


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	        created: function () {
	            this.$on("classifications-changed", function (vm) {
	                // 接受到了navigation的通知之后，再通知contents切换view
	                this.$broadcast("classifications-changed", vm);
	            });
	        },
	        components: {
	            navigation: __webpack_require__(18),
	            contents: __webpack_require__(21)
	        }
	    };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19)
	module.exports.template = __webpack_require__(20)


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {
	        data: function () {
	            // 从localStorage中取出token中的user信息
	            var user = JSON.parse(window.localStorage.getItem("token")).user;

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
	        // 生命周期
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

	                // 在点击classification之后collapse自动收起
	                setTimeout(function () {
	                    $("#navigation").collapse("hide");
	                }, 150);
	            },
	            logOut: function (e) {
	                var self = this;

	                // 取得存储的token，并且添加到http request的Authorization首部字段。
	                var token = JSON.parse(window.localStorage.getItem("token")).token;

	                var loggingOut = $.ajax({
	                    url: "/authentications",
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
/* 20 */
/***/ function(module, exports) {

	module.exports = "<nav class=\"navbar navbar-default navbar-fixed-top\">\n        <div class=\"container\">\n            <div class=\"navbar-header\">\n                <button\n                    type=\"button\"\n                    class=\"navbar-toggle collapsed\"\n                    data-toggle=\"collapse\"\n                    data-target=\"#navigation\"\n                    aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" href=\"/articles\">Home</a>\n            </div>\n            <div class=\"collapse navbar-collapse\" id=\"navigation\">\n                <ul class=\"nav navbar-nav\">\n                    <li\n                        v-on=\"click: onClick\"\n                        v-ref=\"links\"\n                        v-repeat=\"item in classifications\">\n                        <a v-attr=\"href: item.href\" v-text=\"item.name\"></a>\n                    </li>\n                </ul>\n                <ul class=\"nav navbar-nav navbar-right\">\n                    <li class=\"dropdown\">\n                        <a\n                            class=\"dropdown-toggle\"\n                            data-toggle=\"dropdown\"\n                            role=\"button\"\n                            aria-haspopup=\"true\"\n                            aria-expanded=\"false\">\n                            <span v-text=\"user.pen_name\"></span>\n                            <span class=\"caret\"></span>\n                        </a>\n                        <ul class=\"dropdown-menu\">\n                            <li v-repeat=\"menu in dropdownMenu\">\n                                <a v-attr=\"href: menu.href\" v-text=\"menu.name\"></a>\n                            </li>\n                            <li role=\"separator\" class=\"divider\"></li>\n                            <li><a v-on=\"click: logOut\">Log out</a></li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </nav>";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22)
	module.exports.template = __webpack_require__(38)


/***/ },
/* 22 */
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
	            articles: __webpack_require__(23),
	            authors: __webpack_require__(32),
	            tags: __webpack_require__(35)
	        }
	    };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24)
	module.exports.template = __webpack_require__(31)


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	        // 数据
	        data: function () {
	            var user = JSON.parse(window.localStorage.getItem("token")).user;

	            return {
	                myArticles: {
	                    page: 1, // 我的文章默认为第一页
	                    limit: 6, // 我的文章每页有x篇文章
	                    data: [],
	                    left: "disabled",
	                    right: false
	                },
	                user: user
	            };
	        },
	        // 组件实例方法
	        methods: {
	            pageDown: function () {
	                var page = this.$data.myArticles.page;
	                if (page === 1) {
	                    this.myArticles.left = "disabled";
	                    return ;
	                }

	                if (page > 1) {
	                    this.myArticles.page --;
	                    this.myArticles.right = false;
	                    this.getMyArticles();
	                }

	            },
	            pageUp: function () {
	                var limit = this.myArticles.limit;
	                var length = this.myArticles.data.length;

	                if (length < limit) {
	                    this.myArticles.right = "disabled";
	                    return ;
	                }

	                this.myArticles.page ++;
	                this.myArticles.left = false;
	                this.getMyArticles();

	            },
	            getMyArticles: function (e) {
	                // 获取我的文章

	                // fuckthis
	                var self = this;

	                // 获取我的文章数据，需要分页的，按照时间降序排序排列
	                var sort = "-createAt";
	                var page = this.$data.myArticles.page; // 获取文章的页
	                var limit = this.$data.myArticles.limit; // 每页x篇文章

	                // 获取token中的author
	                var token = JSON.parse(window.localStorage.getItem("token"));
	                var author = token.user.pen_name;

	                var getting = $.ajax({
	                    url: "/articles",
	                    data: {
	                        sort: sort,
	                        limit: limit,
	                        offset: (page - 1) * limit,
	                        author: author
	                    },
	                    dataType: "json", // set 'Accepts' header field
	                    method: "GET" // set http method
	                });

	                getting
	                    .done(function (data) {
	                        self.$data.myArticles.data = data;
	                        self.$emit("get-my-articles");
	                    })
	                    .fail(function (error) {
	                        console.log(error);
	                    });
	            }
	        },
	        // 生命周期
	        created: function () {
	            this.getMyArticles();
	            this.$on("get-artcile-by-id", function (data) {
	                this.$broadcast("get-artcile-by-id", data);
	            });
	        },
	        // 组件
	        components: {
	            editor: __webpack_require__(25),
	            articleItem: __webpack_require__(28)
	        },
	        // 过滤器
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26)
	module.exports.template = __webpack_require__(27)


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = {
	        modal: $("#new-article-modal"),
	        data: function () {
	            return {
	                id: -1,
	                article: {
	                    title: "",
	                    tag: "",
	                    content: "" // 编辑器的内容，既是文章的内容
	                },
	                status: "new"
	            };
	        },
	        methods: {
	            saveButtonClick: function (e) {
	                if (this.status === "new") {
	                    this.createNewArticle(e);
	                }
	                else if (this.status === "update") {
	                    this.updateArticle(e);
	                }
	            },
	            createNewArticle: function (e) {
	                // fuck this
	                var self = this;
	                // 关闭新建文章的模态框
	                // this.modal.modal("hide");

	                // 取得存储的token，并且添加到http request的Authorization首部字段。
	                var token = JSON.parse(window.localStorage.getItem("token")).token;

	                // 取出文章内容
	                this.article.content = this.editor.getData();

	                var title = this.article.title;
	                var tag = this.article.tag;
	                var content = this.article.content;

	                if (title === "" || tag === "" || content === "") {
	                    alert("title或者tag或者content不能为空");
	                    return ;
	                }

	                // 发送article的数据
	                var postting = $.ajax({
	                    url: "/articles",
	                    headers: {
	                        Authorization: "jwt " + token
	                    },
	                    data: self.article,
	                    dataType: "json", // set 'Accepts' header field
	                    method: "POST" // set http method
	                });

	                postting
	                    .done(function (data) {
	                        console.log(data);
	                    })
	                    .fail(function (error) {
	                        console.log(error);
	                    });
	            },
	            updateArticle: function (e) {
	                var self = this;
	                var token = JSON.parse(window.localStorage.getItem("token")).token;

	                this.article.content = this.editor.getData();
	                var id = this.id;

	                var putting = $.ajax({
	                    url: "/articles/" + id,
	                    headers: {
	                        Authorization: "jwt " + token
	                    },
	                    data: self.article,
	                    dataType: "json", // set 'Accepts' header field
	                    method: "PUT" // set http method
	                });

	                putting
	                    .done(function (data) {
	                        console.log(data);
	                    })
	                    .fail(function (error) {
	                        console.log(error);
	                    });
	            }
	        },
	        // 生命周期
	        created: function () {
	            // hackthis
	            var self = this;

	            this.$on("get-artcile-by-id", function (data) {
	                self.article.title = data.title;
	                self.article.tag = data.tag;
	                self.id = data.id;
	                self.editor.setData(data.content);
	                self.modal.modal("show");
	                self.status = "update";
	            });
	        },
	        ready: function () {
	            // hackthis
	            var self = this;

	            // 实例化编辑器，并且设置自定义的配置文件
	            // 将editor添加到当前的组件实例上，以便于访问
	            this.editor = CKEDITOR.replace("editor", {
	                customConfig: "/scripts/ckeditor_config.js"
	            });

	            // 将modal添加到当前的组件实例上，以便于访问。
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
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div\n        class=\"modal fade\"\n        id=\"new-article-modal\"\n        tabindex=\"-1\"\n        role=\"dialog\"\n        aria-labelledby=\"new-article-modal-title\"\n        aria-describedby=\"create new article\">\n        <div\n            class=\"modal-dialog modal-lg\"\n            role=\"document\"\n            aria-hidden=\"true\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button\n                        type=\"button\"\n                        class=\"close\"\n                        data-dismiss=\"modal\"\n                        aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    <h4 class=\"modal-title\" id=\"new-article-modal-title\">\n                        Create an article\n                    </h4>\n                </div>\n                <div class=\"modal-body\">\n                    <input\n                        type=\"text\"\n                        v-model=\"article.title\"\n                        maxlength=\"120\"\n                        class=\"new-article-title\"\n                        id=\"new-article-title\"\n                        placeholder=\"标题\">\n                    <input\n                        type=\"text\"\n                        v-model=\"article.tag\"\n                        maxlength=\"120\"\n                        class=\"new-article-tag\"\n                        id=\"new-article-tag\"\n                        placeholder=\"添加相关标签\">\n                    <!-- editor begin -->\n                    <textarea name=\"editor\" id=\"editor\"></textarea>\n                    <!-- editor end -->\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                    <button v-on=\"click: saveButtonClick\" type=\"button\" class=\"btn btn-primary\">Save</button>\n                </div>\n            </div>\n        </div>\n    </div>";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29)
	module.exports.template = __webpack_require__(30)


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {
	        methods: {
	            updateArticle: function (id) {
	                var self = this;

	                var getting = $.ajax({
	                    url: "/articles/" + id,
	                    dataType: "json", // set 'Accepts' header field
	                    method: "GET" // set http method
	                });

	                getting
	                    .done(function (data) {
	                        self.$dispatch("get-artcile-by-id", data);
	                    })
	                    .fail(function (error) {
	                        console.log(error);
	                    });
	            },
	            deleteArticle: function (id) {
	                var self = this;

	                // 取得存储的token，并且添加到http request的Authorization首部字段。
	                var token = JSON.parse(window.localStorage.getItem("token")).token;

	                var getting = $.ajax({
	                    url: "/articles/" + id,
	                    dataType: "json", // set 'Accepts' header field
	                    method: "DELETE", // set http method
	                    headers: {
	                        Authorization: "jwt " + token
	                    }
	                });

	                getting
	                    .done(function (data) {
	                        alert("删除成功");
	                    })
	                    .fail(function (error) {
	                        console.log(error);
	                    });
	            }
	        }
	    };

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<tr>\n        <td>\n            <div class=\"row\">\n                <div class=\"col-md-8\">\n                    <div class=\"media\">\n                        <div class=\"media-body\">\n                            <h3 class=\"media-heading\">\n                                <span v-text=\"article.title\" class=\"h4\"></span>\n                                <span>#{{article.tag}}</span>\n                            </h3>\n                            <span class=\"small\">By</span>\n                            <span v-text=\"article.author\" class=\"h4\"></span>\n                            <span class=\"small\">at</span>\n                            <span v-text=\"article.createAt | timeFormat\" class=\"\"></span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"clearfix visible-md-block\"></div>\n                <div class=\"col-md-4\">\n                    <div class=\"btn-group btn-group-xs\" role=\"group\" aria-label=\"...\">\n                        <button v-on=\"click: updateArticle(article.id)\"type=\"button\" class=\"btn btn-default\">修改</button>\n                        <button v-on=\"click: deleteArticle(article.id)\"type=\"button\" class=\"btn btn-default\">删除</button>\n                    </div>\n                </div>\n            </div>\n        </td>\n    </tr>";

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container container-component\">\n        <div class=\"row\">\n            <div class=\"col-md-3\">\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <img src=\"/images/1-2.jpg\" alt=\"avator\" class=\"img-rounded avator\">\n                    </div>\n                </div>\n                <br>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <span class=\"h3\">{{user.pen_name}}  13Articles</span>\n                        <br>\n                        <span class=\"glyphicon glyphicon-envelope\" aria-hidden=\"true\"></span>\n                        <a href=\"mailto:{{user.username}}\">{{user.username}}</a>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-md-9\">\n                <div class=\"row\">\n                    <div class=\"col-md-offset-9 col-md-3 col-sm-offset-8 col-sm-4 col-xs-12\">\n                        <button\n                            id=\"new\"\n                            class=\"btn btn-default btn-block\"\n                            data-toggle=\"modal\"\n                            data-target=\"#new-article-modal\"\n                            type=\"button\">\n                            Create new article\n                        </button>\n                    </div>\n                </div>\n                <!-- articles -->\n                <div class=\"row articles-articleList\">\n                    <!-- myArticles -->\n                    <div class=\"col-md-12\">\n                        <div class=\"panel panel-default\">\n                            <div class=\"panel-heading\">\n                                <span class=\"h5\">我的文章</span>\n                            </div>\n                            <table class=\"table table-hover\">\n                                <tbody>\n                                    <tr\n                                        v-component=\"article-item\"\n                                        wait-for=\"get-my-articles\"\n                                        v-repeat=\"article in myArticles.data\">\n                                    </tr>\n                                </tbody>\n                            </table>\n                            <div class=\"panel-footer text-right\">\n                                <div class=\"btn-group btn-group-xs\" role=\"group\">\n                                    <button\n                                        v-attr=\"disabled: myArticles.left\"\n                                        v-on=\"click: pageDown\"\n                                        type=\"button\"\n                                        class=\"btn btn-default\">\n                                        <span class=\"glyphicon glyphicon-menu-left\" aria-hidden=\"true\"></span>\n                                    </button>\n                                    <button\n                                        v-attr=\"disabled: myArticles.right\"\n                                        v-on=\"click: pageUp\"\n                                        type=\"button\"\n                                        class=\"btn btn-default\">\n                                        <span class=\"glyphicon glyphicon-menu-right\" aria-hidden=\"true\"></span>\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- editor -->\n        <editor></editor>\n        <!-- editor end -->\n    </div>";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33)
	module.exports.template = __webpack_require__(34)


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = {

	    };

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <p>\n                    authors vm\n                </p>\n            </div>\n        </div>\n    </div>";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(36)
	module.exports.template = __webpack_require__(37)


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = {

	    };

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <p>\n                    tags\n                </p>\n            </div>\n        </div>\n    </div>";

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "<component is=\"{{currentView}}\"></component>";

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "<div>\n        <navigation v-ref=\"navigation\"></navigation>\n        <contents v-ref=\"content\"></contents>\n    </div>";

/***/ }
/******/ ]);