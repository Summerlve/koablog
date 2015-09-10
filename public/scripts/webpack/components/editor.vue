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
                        Create a new article
                    </h4>
                </div>
                <div class="modal-body">
                    <input
                        type="text"
                        v-model="newArticle.title"
                        maxlength="120"
                        class="new-article-title"
                        id="new-article-title"
                        placeholder="标题">
                    <input
                        type="text"
                        v-model="newArticle.tag"
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
                    <button v-on="click: createNewArticle" type="button" class="btn btn-primary">Save</button>
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
                editor: null, // 用于保存编辑器实例
                newArticle: {
                    title: "",
                    tag: "",
                    content: "" // 编辑器的内容，既是文章的内容
                }
            };
        },
        methods: {
            createNewArticle: function (e) {
                this.modal.modal("hide");
            }
        },
        created: function () {
            // hackthis
            var self = this;

            // 监听上传事件
            this.$on("upload", function () {
                console.log(this.content);
            });
        },
        ready: function () {
            // hackthis
            var self = this;

            // 实例化编辑器，并且设置自定义的配置文件
            this.editor = CKEDITOR.replace("editor", {
                customConfig: "/scripts/ckeditor_config.js"
            });

            // 在初始化编辑器之后将this.content渲染到编辑器中
            // this.editor.setData(this.newArticle.content);

            // 在编辑器的内容改变时，自动更新this.content
            this.editor.on("change", function (e) {
                self.content = e.editor.getData();
            });

            // 将modal添加到当前的组建实例上，以便于访问
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
