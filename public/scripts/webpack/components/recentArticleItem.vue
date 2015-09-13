<template>
    <div class="media">
        <div class="media-body">
            <h4 class="media-heading">
                <span v-text="article.title"></span>
                <span v-text="article.tag"></span>
                <span v-text="article.createAt | timeFormat"></span>
            </h4>
            <span v-text="article.author"></span>
        </div>
        <div class="media-right media-middle">
            <button
                v-on="click: onClick"
                type="button"
                class="btn btn-default btn-xs">
                <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
            </button>
        </div>
    </div>
</template>

<script>
    module.exports = {
        methods: {
            onClick: function (e) {
                
            }
        }
    };
</script>
