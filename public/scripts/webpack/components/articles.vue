<template>
    <div class="container">
        <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
            <button
                v-on="click: recentArticles"
                type="button"
                class="btn btn-default">
                Recent 5
            </button>
            <button
                type="button"
                class="btn btn-default"
                data-toggle="modal"
                data-target="#new-article-modal">
                New
            </button>
            <button
                type="button"
                class="btn btn-default">
                Button
            </button>
        </div>

        <editor></editor>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {

            };
        },
        methods: {
            recentArticles: function (e) {
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
                        console.dir(data);
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            }
        },
        created: function () {

        },
        components: {
            editor: require("./editor.vue")
        }
    };
</script>
