<template>
    <div
        class="modal fade"
        id="new-article-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="new-article-modal-title"
        aria-describedby="create new article">
        <div
            class="modal-dialog modal-lg"
            role="document"
            aria-hidden="true">
            <div class="modal-content">
                <div class="modal-header">
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="new-article-modal-title">
                        Create an article
                    </h4>
                </div>
                <div class="modal-body">
                    <input
                        type="text"
                        v-model="article.title"
                        maxlength="120"
                        class="new-article-title"
                        id="new-article-title"
                        placeholder="标题">
                    <input
                        type="text"
                        v-model="article.tag"
                        maxlength="120"
                        class="new-article-tag"
                        id="new-article-tag"
                        placeholder="添加相关标签">
                    <!-- editor begin -->
                    <textarea name="editor" id="editor"></textarea>
                    <!-- editor end -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button v-on="click: saveButtonClick" type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        modal: $("#new-article-modal"),
        data: function () {
            return {
                id: -1,
                article: {
                    title: "",
                    tag: "",
                    content: "" // 编辑器的内容，既是文章的内容
                },
                status: "new"
            };
        },
        methods: {
            saveButtonClick: function (e) {
                if (this.status === "new") {
                    this.createNewArticle(e);
                }
                else if (this.status === "update") {
                    this.updateArticle(e);
                }
            },
            createNewArticle: function (e) {
                // fuck this
                var self = this;
                // 关闭新建文章的模态框
                // this.modal.modal("hide");

                // 取得存储的token，并且添加到http request的Authorization首部字段。
                var token = JSON.parse(window.localStorage.getItem("token")).token;

                // 取出文章内容
                this.article.content = this.editor.getData();

                var title = this.article.title;
                var tag = this.article.tag;
                var content = this.article.content;

                if (title === "" || tag === "" || content === "") {
                    alert("title或者tag或者content不能为空");
                    return ;
                }

                // 发送article的数据
                var postting = $.ajax({
                    url: "/articles",
                    headers: {
                        Authorization: "jwt " + token
                    },
                    data: self.article,
                    dataType: "json", // set 'Accepts' header field
                    method: "POST" // set http method
                });

                postting
                    .done(function (data) {
                        console.log(data);
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            },
            updateArticle: function (e) {
                var self = this;
                var token = JSON.parse(window.localStorage.getItem("token")).token;

                this.article.content = this.editor.getData();
                var id = this.id;

                var putting = $.ajax({
                    url: "/articles/" + id,
                    headers: {
                        Authorization: "jwt " + token
                    },
                    data: self.article,
                    dataType: "json", // set 'Accepts' header field
                    method: "PUT" // set http method
                });

                putting
                    .done(function (data) {
                        console.log(data);
                    })
                    .fail(function (error) {
                        console.log(error);
                    });
            }
        },
        // 生命周期
        created: function () {
            // hackthis
            var self = this;

            this.$on("get-artcile-by-id", function (data) {
                self.article.title = data.title;
                self.article.tag = data.tag;
                self.id = data.id;
                self.editor.setData(data.content);
                self.modal.modal("show");
                self.status = "update";
            });
        },
        ready: function () {
            // hackthis
            var self = this;

            // 实例化编辑器，并且设置自定义的配置文件
            // 将editor添加到当前的组件实例上，以便于访问
            this.editor = CKEDITOR.replace("editor", {
                customConfig: "/scripts/ckeditor_config.js"
            });

            // 将modal添加到当前的组件实例上，以便于访问。
            this.modal = $("#new-article-modal");

            // repaire ckeditor inside bootstrap modals
            $.fn.modal.Constructor.prototype.enforceFocus = function() {
                $( document )
                    .off( 'focusin.bs.modal' ) // guard against infinite focus loop
                    .on( 'focusin.bs.modal', $.proxy( function( e ) {
                        if (
                            this.$element[ 0 ] !== e.target && !this.$element.has( e.target ).length
                            // CKEditor compatibility fix start.
                            && !$( e.target ).closest( '.cke_dialog, .cke' ).length
                            // CKEditor compatibility fix end.
                        ) {
                            this.$element.trigger( 'focus' );
                        }
                    }, this ) );
            };
        }
    };
</script>
