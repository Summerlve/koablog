<template>
    <div class="container contents-articles-container">
        <div class="row">
            <div class="col-md-2">
                <div class="btn-group-vertical btn-group-sm" role="group" aria-label="Vertical button group">
                    <button
                        v-on="click: getRecentArticles"
                        id="getRecentArticles"
                        class="btn btn-default"
                        type="button">
                        Recent 5
                    </button>
                    <button
                        id="new"
                        class="btn btn-default"
                        data-toggle="modal"
                        data-target="#new-article-modal"
                        type="button">
                        New
                    </button>
                    <button
                        type="button"
                        class="btn btn-default">
                        Button
                    </button>
                </div>
            </div>

            <!-- recent 5 articles -->
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-5">
                        <recent-article-item
                            wait-for="recent-articles-loaded"
                            v-repeat="article in recentArticles">
                        </recent-article-item>
                    </div>
                </div>
            </div>
        </div>
        <editor></editor>
    </div>
</template>

<script>
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
            editor: require("./editor.vue"),
            recentArticleItem: require("./recentArticleItem.vue")
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
</script>
