<template>
    <div class="container-fluid">
        <div class="row">

        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                currentView: "articles"
            };
        },
        components: {
            articles: require("./articles.vue"),
            authors: require("./authors.vue"),
            tags: require("./tags.vue")
        }
    };
</script>
