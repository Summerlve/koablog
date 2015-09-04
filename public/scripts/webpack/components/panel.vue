<template>
    <navigation></navigation>
    <content></content>
</template>

<script>
    module.exports = {
        components: {
            navigation: require("./navigation.vue"),
            content: require("./content.vue")
        }
    };
</script>
