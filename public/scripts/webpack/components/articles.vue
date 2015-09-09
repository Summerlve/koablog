<template>
    <div class="container">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#new-article-modal">
            create a new article
        </button>
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

        },
        created: function () {

        },
        components: {
            editor: require("./editor.vue")
        }
    };
</script>
