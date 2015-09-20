# 记事
	前端使用Bootstrap和jQuery和Vue.js，
	后端使用koa、sequelize
	数据库是mysql
	restful设计
	使用markdown或者富文本编辑器（要解决的是图片的问题）

## v 0.0.1：实现用户和文章还有权限管理。
##### api设计
/authors
	GET		/authors?page=1 所有的作者，分页
	GET		/authors/:authorName 某一个作者的资料

/articles
	GET		/articles?page=1 所有的文章，分页
	GET		/articles/:id 某一篇文章
	POST 	/articles

/users
	GET		/users/:user

/groups

/tags
