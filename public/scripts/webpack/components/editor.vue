<template>
    <textarea name="editor" id="editor" v-text="content">
    </textarea>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                content: "<p>Initiasdfasdfl editor content.&lt;/p&gt;",
                editor: null // 用于保存编辑器实例
            };
        },
        props: [

        ],
        methods: {

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

            this.content = this.editor.getData();

            this.editor.on("change", function (e) {
                self.content = e.editor.getData();
            });
        }
    };
</script>
