<template>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-11 col-md-offset-1">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/articles">Home</a>
                </div>
                <div class="collapse navbar-collapse" id="navigation">
                    <ul class="nav navbar-nav">
                        <li v-on="click: onClick" v-ref="links" v-repeat="item in classifications">
                            <a href="{{item.href}}">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                classifications: [
                    {name:"Authors", href: "#/authors"},
                    {name:"Articles", href: "#/articles"},
                    {name:"Tags", href: "#/tags"}
                ]
            };
        },
        methods: {
            onClick: function (e) {
                var links = this.$.links;

                for (var i = 0; i < links.length; i++) {
                    var cur = links[i].$el;
                    if (e.currentTarget !== cur) {
                        cur.removeAttribute("class");
                    } else {
                        e.currentTarget.setAttribute("class", "active");
                    }
                }
            }
        }
    };
</script>
