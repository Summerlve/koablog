<template>
    <tr>
        <td>
            <div class="media">
                <div class="media-body">
                    <h3 class="media-heading">
                        <span v-text="article.title" class="h3"></span>&nbsp&nbsp
                        <span v-text="'#' + article.tag" class="label label-default"></span>
                    </h3>
                    <h4>
                        <span class="small">By</span>
                        <span v-text="article.author" class="h4"></span>
                        <span class="small">at</span>
                        <span v-text="article.createAt | timeFormat" class=""></span>
                    </h4>
                </div>
                <div class="media-right media-middle">
                    <div class="btn-group btn-group-xs" role="group">
                      <button type="button" class="btn btn-default">Left</button>
                    </div>
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
