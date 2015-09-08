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
                <a class="navbar-brand" href="/articles">Home</a>
            </div>
            <div class="collapse navbar-collapse" id="navigation">
                <ul class="nav navbar-nav">
                    <li v-on="click: onClick" v-ref="links" v-repeat="item in classifications">
                        <a v-attr="href: item.href" v-text="item.name"></a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false">
                            <span v-text="user.pen_name"></span>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li v-repeat="menu in dropdownMenu">
                                <a v-attr="href: menu.href" v-text="menu.name"></a>
                            </li>
                            <li role="separator" class="divider"></li>
                            <li><a v-on="click: logOut">Log out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    module.exports = {
        data: function () {
            var user =  JSON.parse(window.localStorage.getItem("token")).user;
            return {
                classifications: [
                    // the index of 0 is the default.
                    {name:"Articles", href: "#/articles"},
                    {name:"Authors", href: "#/authors"},
                    {name:"Tags", href: "#/tags"}
                ],
                dropdownMenu: [
                    {name:"Profile", href: "#/profile"},
                    {name:"Settings", href: "#/settings"},
                ],
                user: user
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
            },
            logOut: function (e) {
                var self = this;

                // 取得存储的token，并且添加到http request的Authorization首部字段。
                var token = JSON.parse(window.localStorage.getItem("token")).token;

                var loggingOut = $.ajax({
                    url: "/authentication",
                    dataType: "json",
                    method: "DELETE",
                    headers: {
                        Authorization: "jwt " + token
                    }
                });

                loggingOut
                    .done(function (data) {
                        // 服务器端退出成功，现将前端的token删除，并且切换到登录界面
                        window.localStorage.removeItem("token");
                        self.$dispatch("logout-succeed");
                    })
                    .fail(function () {
                        alert("退出失败");
                    });
            }
        },
        ready: function () {
            this.$.links[0].$el.click(); // 默认navigation中的第一个项选中。
        }
    };
</script>
