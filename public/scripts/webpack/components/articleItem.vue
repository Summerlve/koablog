<template>
    <tr>
        <td>
            <div class="media">
                <div class="media-body">
                    <p class="media-heading">
                        <span v-text="article.title" class="h3"></span>
                        <span v-text="'#' + article.tag" class="label label-primary small"></span>
                    </p>
                    By <span v-text="article.author" class="h4"></span> at <span v-text="article.createAt | timeFormat" class="small"></span>
                </div>
                <div class="media-right media-middle">
                    <!-- <div class="btn-group btn-group-xs" role="group">
                      <button type="button" class="btn btn-default">Left</button>
                      <button type="button" class="btn btn-default">Middle</button>
                      <button type="button" class="btn btn-default">Right</button>
                    </div> -->
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    module.exports = {
        methods: {
            onClick: function (e) {

            }
        }
    };
</script>
