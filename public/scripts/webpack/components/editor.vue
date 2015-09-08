<template>
    <textarea name="editor" id="editor" v-text="contentOfEditor">
    </textarea>
    <button v-on="click: sentData">save</button>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                contentOfEditor: "&lt;p&gt;Initiasdfasdfl editor content.&lt;/p&gt;",
                instanceOfEditor: null // 用于保存编辑器实例
            };
        },
        methods: {
            sentData: function (e) {
                console.log(this.contentOfEditor);
                console.log(this.instanceOfEditor.getData());
            }
        },
        ready: function () {
            // hackthis
            var self = this;

            // 实例化编辑器，并且设置自定义的配置文件
            this.instanceOfEditor = CKEDITOR.replace("editor", {
                // customConfig: "/scripts/ckeditor_config.js"
            });

            this.contentOfEditor = this.instanceOfEditor.getData();

            this.instanceOfEditor.on("change", function (e) {
                self.contentOfEditor = e.editor.getData();
            });
        }
    };
</script>
