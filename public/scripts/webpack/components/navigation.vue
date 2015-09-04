<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!-- <a class="navbar-brand" href="/articles">Home</a> -->
            </div>
            <div class="collapse navbar-collapse" id="navigation">
                <ul class="nav navbar-nav">
                    <li v-on="click: onClick" v-ref="links" v-repeat="item in classifications">
                        <a href="{{item.href}}">{{item.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                classifications: [
                    // the index of 0 is the default.
                    {name:"Articles", href: "#/articles"},
                    {name:"Authors", href: "#/authors"},
                    {name:"Tags", href: "#/tags"}
                ]
            };
        },
        methods: {
            onClick: function (e) {
                // when one of classifications was clicked , change the status.
                // get the current son component instance.
                var links = this.$.links;
                var vm = null;
                links.forEach(function (current, index, array) {
                    if (current.$el === e.currentTarget) vm = current;
                });

                // 通知panel
                this.$dispatch("classifications-changed", vm);

                var cur = e.currentTarget;
                for (var i = 0; i < links.length; i++) {
                    var link = links[i].$el;
                    if (cur !== link) {
                        link.removeAttribute("class");
                    } else {
                        cur.setAttribute("class", "active");
                    }
                }
            }
        },
        ready: function () {
            this.$.links[0].$el.click(); // 默认navigation中的第一个项选中。
        }
    };
</script>
