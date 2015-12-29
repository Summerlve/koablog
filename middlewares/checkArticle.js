"use strict";
// check whether article exists
const Article = require("../models/Article").Article;
const ArticleView = require("../models/Article").ArticleView;

module.exports = function* checkArticle (next) {
    let id = parseInt(this.params.id, 10);

	if (isNaN(id)) {
		this.status = 404;
		return ;
	}

	let article = yield ArticleView.find({
		where: {
			id: id
		}
	});

	if (article === null) {
		this.status = 404;
		return;
	}

    this.article = article;

    yield next;
};
