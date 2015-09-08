<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <!-- <label for="new-article-title"> 文章标题：</label> -->
                <input type="text" class="form-control input-lg" id="new-article-title" placeholder="文章标题" style="margin-bottom: 20px;">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <editor></editor>
            </div>
        </div>
        <div class="row">
            <div class="col-md-1 col-md-offset-11">
                <button v-on="click: uploadClicked" class="btn btn-default btn-lg" type="submit" style="margin-top: 20px;">上传</button>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {

            };
        },
        methods: {
            uploadClicked: function (e) {
                this.$broadcast("upload");
            }
        },
        created: function () {

        },
        components: {
            editor: require("./editor.vue")
        }
    };
</script>
