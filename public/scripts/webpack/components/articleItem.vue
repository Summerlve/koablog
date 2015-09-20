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
                        {{isMine}}
                    </h4>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    module.exports = {
        props: ["isMine"], // 判断是否是自己的文章
        methods: {
            onClick: function (e) {

            }
        }
    };
</script>
