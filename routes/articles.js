const { Article, validateArticle } = require('../models/article');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

/**
 * @api {post} /api/articles
 * @apiName CreateArticle
 * @apiGroup Articles
 * 
 * @apiDescription Publish a news article.
 */
router.post('/', async (req, res) => {

    const { error } = validateArticle(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let article = new Article(_.pick(req.body, ['imageUrl', 'title', 'content', 'author']));
    await article.save();

    res.send(article);

});

/**
 * @api {get} /api/articles/1
 * @apiName GetArticleById
 * @apiGroup Articles
 * 
 * @apiDescription Get a published article by Id.
 */
router.get('/:articleId', async (req, res) => {

    const article = await Article.findById(req.params.articleId);
    res.send(article);

});

/**
 * @api {get} /api/articles
 * @apiName GetArticles
 * @apiGroup Articles
 * 
 * @apiDescription Get all published articles.
 */
router.get('/', async (req, res) => {

    const articles = await Article.find({}, {}, { sort: { 'created_at' : -1 } });
    res.send(articles);

});

module.exports = router;