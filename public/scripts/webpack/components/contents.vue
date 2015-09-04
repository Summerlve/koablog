<template>
    <component is="{{currentView}}" keep-alive></component>
</template>

<script>
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
        components: {
            articles: require("./articles.vue"),
            authors: require("./authors.vue"),
            tags: require("./tags.vue")
        }
    };
</script>
