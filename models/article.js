const Joi = require('joi');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    imageUrl: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    }
});

const Article = mongoose.model('Article', articleSchema);

function validateArticle(article) {
    const schema = {
        imageUrl: Joi.string().allow('').allow(null),
        title: Joi.string().required(),
        content: Joi.string().required(),
        author: Joi.string().required()
    };

    return Joi.validate(article, schema);
}

exports.articleSchema = articleSchema;
exports.Article = Article;
exports.validateArticle = validateArticle;