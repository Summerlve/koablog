<template>
    <tr>
        <td>
            <div class="row">
                <div class="col-md-8">
                    <div class="media">
                        <div class="media-body">
                            <h3 class="media-heading">
                                <span v-text="article.title" class="h4"></span>
                                <span>#{{article.tag}}</span>
                            </h3>
                            <span class="small">By</span>
                            <span v-text="article.author" class="h4"></span>
                            <span class="small">at</span>
                            <span v-text="article.createAt | timeFormat" class=""></span>
                        </div>
                    </div>
                </div>
                <div class="clearfix visible-md-block"></div>
                <div class="col-md-4">
                    <div class="btn-group btn-group-xs" role="group" aria-label="...">
                      <button v-on="click: update(article.id)"type="button" class="btn btn-default">修改</button>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    module.exports = {
        methods: {
            update: function (id) {
                var self = this;

                var getting = $.ajax({
                    url: "/articles/" + id,
                    dataType: "json", // set 'Accepts' header field
                    method: "GET" // set http method
                });

                getting
                    .done(function (data) {
                        self.$dispatch("get-artcile-by-id", data);
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            }
        }
    };
</script>
