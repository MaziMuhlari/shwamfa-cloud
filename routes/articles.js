const { Article, validateArticle } = require('../models/article');
const auth = require('../middleware/authentication');
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
router.post('/', auth, async (req, res) => {

    const { error } = validateArticle(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let article = new Article(_.pick(req.body, ['imageUrl', 'title', 'blurb', 'content', 'author']));
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
router.get('/:articleId', auth, async (req, res) => {

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
router.get('/', auth, async (req, res) => {

    const articles = await Article.find({}, {}, { sort: { 'created_at' : -1 } });
    res.send(articles);

});

/**
 * @api {get} /api/articles/1
 * @apiName DeleteArticleById
 * @apiGroup Articles
 * 
 * @apiDescription Delete an article by Id.
 */
router.get('/:id', auth, async (req, res) => {

    const article = await Article.findByIdAndDelete(req.params.id);
    res.send(article);

});

module.exports = router;