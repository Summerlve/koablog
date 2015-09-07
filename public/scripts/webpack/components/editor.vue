<template>
    <textarea name="editor" id="editor">
        {{editorInput}}
    </textarea>

    <button v-on="click: sentData">save</button>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                editorInput: "&lt;p&gt;Initial editor content.&lt;/p&gt;"
            };
        },
        methods: {
            sentData: function (e) {
                input = CKEDITOR.instances.editor.getData();
                console.log(input);
                console.log(this.editorInput);
            }
        },
        ready: function () {
            var editor = this.$el;
            CKEDITOR.replace("editor", {
                customConfig: "/scripts/ckeditor_config.js"
            });
        }
    };
</script>
