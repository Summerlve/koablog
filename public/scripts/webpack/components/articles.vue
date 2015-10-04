<template>
    <div class="container components-contents-articles-btns">
        <div class="row">
            <div class="col-md-offset-10 col-md-2 col-sm-offset-9 col-sm-3 col-xs-12">
                <button
                    id="new"
                    class="btn btn-default btn-block"
                    data-toggle="modal"
                    data-target="#new-article-modal"
                    type="button">
                    写博客
                </button>
            </div>
        </div>
        <!-- articles -->
        <div class="row components-contents-articles-articleList">
            <!-- myArticles -->
            <div class="col-md-7">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span v-text="myArticles.panelHeading" class="h5"></span>
                    </div>
                    <table class="table table-hover table-condensed">
                        <tbody>
                            <tr
                                v-component="article-item"
                                wait-for="get-my-articles"
                                v-repeat="article in myArticles.data">
                            </tr>
                        </tbody>
                    </table>
                    <div class="panel-footer text-right">
                        <div class="btn-group btn-group-xs" role="group">
                            <button
                                v-attr="disabled: myArticles.left"
                                v-on="click: pageDown"
                                type="button"
                                class="btn btn-default">
                                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                            </button>
                            <button
                                v-attr="disabled: myArticles.right"
                                v-on="click: pageUp"
                                type="button"
                                class="btn btn-default">
                                <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- myArticles end-->
            <!-- recentArticles -->
            <div class="col-md-5">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span v-text="recentArticles.panelHeading" class="h5"></span>
                    </div>
                    <table class="table table-hover table-condensed">
                        <tbody>
                            <tr
                                v-component="article-item"
                                wait-for="get-recent-articles"
                                v-repeat="article in recentArticles.data">
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- recentArticles end -->
            </div>
        </div>
        <editor></editor>
    </div>
</template>

<script>
    module.exports = {
        // 数据
        data: function () {
            return {
                myArticles: {
                    page: 1, // 我的文章默认为第一页
                    limit: 6, // 我的文章每页有x篇文章
                    data: [],
                    panelHeading: "我的文章",
                    left: "disabled",
                    right: false
                },
                recentArticles: {
                    data: [],
                    panelHeading: "最近的文章"
                }
            };
        },
        // 组件实例方法
        methods: {
            getRecentArticles: function (e) {
                // 获取此博客系统最近的x篇文章

                // fuckthis
                var self = this;

                // 取前x篇文章
                var limit = 10;

                // 按照创建时间的倒序
                var sort = "-createAt";

                // get the recent 5 articles.
                var getting = $.ajax({
                    url: "/articles",
                    data: {
                        sort: sort,
                        limit: limit,
                        offset: 0
                    },
                    dataType: "json", // set 'Accepts' header field
                    method: "GET" // set http method
                });

                getting
                    .done(function (data) {
                        self.$data.recentArticles.data = data;
                        self.$emit("get-recent-articles");
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            },
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
            this.getRecentArticles();
        },
        // 组件
        components: {
            editor: require("./editor.vue"),
            articleItem: require("./articleItem.vue")
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
</script>
