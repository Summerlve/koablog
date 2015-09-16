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
                    <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#article-item-modal">
                        <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                    </button>
                    <div class="modal fade" id="article-item-modal" tabindex="-1" role="dialog" aria-labelledby="article-item-modal-title">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="article-item-modal-title">选择操作</h4>
                                </div>
                                <div class="modal-footer">
                                    <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
                                    <button type="button" class="btn btn-danger">删除</button>
                                    <button type="button" class="btn btn-primary">修改</button>
                                </div>
                            </div>
                        </div>
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
