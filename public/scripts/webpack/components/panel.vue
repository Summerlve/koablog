<template>
    <div>
        <navigation v-ref="navigation"></navigation>
        <contents v-ref="content"></contents>
    </div>
</template>

<script>
    module.exports = {
        created: function () {
            this.$on("classifications-changed", function (vm) {
                // 接受到了navigation的通知之后，再通知contents切换view
                this.$broadcast("classifications-changed", vm);
            });
        },
        components: {
            navigation: require("./navigation.vue"),
            contents: require("./contents.vue")
        }
    };
</script>
