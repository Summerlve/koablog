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
            <div class="dropdown">
                <button
                    v-on="click: onClick"
                    type="button"
                    class="btn btn-default btn-xs dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li><a href="#">Separated link</a></li>
                </ul>
            </div>
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
