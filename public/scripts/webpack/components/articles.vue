<template>
    <div class="container components-contents-articles">
        <div class="row">
            <div class="col-md-10 col-sm-9 col-xs-8">
                <div class="btn-group btn-group-sm" role="group" aria-label="Vertical button group">
                    <button
                        v-on="click: getRecentArticles"
                        id="getRecentArticles"
                        class="btn btn-default"
                        type="button">
                        最近5篇
                    </button>
                    <button
                        v-on="click: getMyArticles"
                        type="button"
                        class="btn btn-default">
                        我的文章
                    </button>
                </div>
            </div>
            <div class="col-md-2 col-sm-3 col-xs-4 text-right">
                <button
                    id="new"
                    class="btn btn-default btn-sm"
                    data-toggle="modal"
                    data-target="#new-article-modal"
                    type="button">
                    写博客
                </button>
            </div>
        </div>
        <!-- articleList -->
        <div class="row components-contents-articles-articleList">
            <div class="col-md-12">
                <table class="table table-hover table-condensed">
                    <tbody>
                        <tr
                            v-component="article-item"
                            wait-for="get-article-data"
                            v-repeat="article in articleList.data">
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row" v-show="isMine">
            <div class="col-md-12">
                <nav>
                    <ul class="pager">
                        <li><a href="#">Prev</a></li>
                        <li><a href="#">Next</a></li>
                    </ul>
                </nav>
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
                isMine: false
            };
        },
        // 组件实例方法
        methods: {
            getRecentArticles: function (e) {
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
                        // 只需要这里触发就可以了，getMyArticles不需要触发的。
                        self.$emit("getArticleData");
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            },
            getMyArticles: function (e) {
                // fuckthis
                var self = this;

                // 显示分页按钮
                this.isMine = true;

                // 获取我的文章数据，需要分页的，按照时间降序排序排列
                var sort = "-createAt";
                var page = 1; // 默认为第一页
                var limit = 5; // 每页x篇文章

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
                        self.articleList.data = data;
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            }
        },
        // 生命周期
        created: function () {
            // 在创建组件实例的时候，获取最近5篇文章的数据
            this.getRecentArticles();
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
