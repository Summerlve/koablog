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
            <div class="col-md-8">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-md-10 col-sm-9 col-xs-8">
                                <span v-text="myArticles.panelHeading" class="h5"></span>
                            </div>
                            <div
                                v-show="isMine"
                                class="col-md-2 col-sm-3 col-xs-4 text-right">
                                <div class="btn-group btn-group-xs" role="group">
                                    <button
                                        v-attr="disabled: leftDisabled"
                                        v-on="click: pageLeft"
                                        type="button"
                                        class="btn btn-default">
                                        <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                                    </button>
                                    <button
                                        v-attr="disabled: rightDisabled"
                                        v-on="click: pageRight"
                                        type="button"
                                        class="btn btn-default">
                                        <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-hover table-condensed">
                        <tbody>
                            <tr
                                is-mine="{{isMine}}"
                                v-component="article-item"
                                wait-for="get-article-data"
                                v-repeat="article in articleList.data">
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- myArticles end-->
            <!-- recentArticles -->
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-md-10 col-sm-9 col-xs-8">
                                <span v-text="recentArticles.panelHeading" class="h5"></span>
                            </div>
                            <div
                                v-show="isMine"
                                class="col-md-2 col-sm-3 col-xs-4 text-right">
                                <div class="btn-group btn-group-xs" role="group">
                                    <button
                                        v-attr="disabled: leftDisabled"
                                        v-on="click: pageLeft"
                                        type="button"
                                        class="btn btn-default">
                                        <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                                    </button>
                                    <button
                                        v-attr="disabled: rightDisabled"
                                        v-on="click: pageRight"
                                        type="button"
                                        class="btn btn-default">
                                        <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-hover table-condensed">
                        <tbody>
                            <tr
                                is-mine="{{isMine}}"
                                v-component="article-item"
                                wait-for="get-article-data"
                                v-repeat="article in articleList.data">
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
                articleList: {
                    data: []
                },
                isMine: false,
                myArticles: {
                    page: 1, // 我的文章默认为第一页
                    limit: 6, // 我的文章每页有x篇文章
                    data: [],
                    panelHeading: "我的文章"
                },
                recentArticles: {
                    data: [],
                    panelHeading: "最近5篇"
                }
            };
        },
        computed: function () {
            return {
                leftDisabled: {
                    cache: false,
                    get: function () {
                        return this.page - 1 < 0 ? true : false;
                    }
                },
                rightDisabled: {
                    cache: false,
                    get: function () {
                        return this.$data.articleList.length < this.$data.limit ? true : false;
                    }
                }
            }
        },
        // 组件实例方法
        methods: {
            getRecentArticles: function (e) {
                // 获取此博客系统最近的5篇文章

                // fuckthis
                var self = this;

                // 隐藏分页按钮
                this.isMine = false;

                // 取前5篇文章
                var limit = 5;

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
                        self.articleList.data = data;
                        self.panelHeading = "最近5篇";
                        // 只需要这里触发就可以了，getMyArticles不需要触发的。
                        self.$emit("getArticleData");
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            },
            getMyArticles: function (e) {
                // 获取我的文章

                // fuckthis
                var self = this;

                // 显示分页按钮
                this.isMine = true;

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
                        self.panelHeading = "我的文章";
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            },
            pageLeft: function (e) {
                // 我的文章的上下翻页
                if (this.page === 1) {
                    this.$data.leftDisabled = true;
                } else {
                    this.$data.page --;
                    this.getMyArticles();
                }
            },
            pageRight: function (e) {
                var length = this.$data.articleList.data.length;
                var limit = this.limit;

                if (length < limit) {
                    this.$data.rightDisabled = true;
                } else {
                    this.$data.page ++;
                    this.getMyArticles();
                }
            }
        },
        // 生命周期
        created: function () {
            // 在创建组件实例的时候，获取最近5篇文章的数据
            this.getRecentArticles();
            this.panelHeading = "最近5篇"
        },
        ready: function () {

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
