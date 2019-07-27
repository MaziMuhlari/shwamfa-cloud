const Joi = require('joi');
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    size: {
        type: Number
    },
    mimetype: {
        type: String
    },
    filename: {
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

const Media = mongoose.model('Media', mediaSchema);

function validateMedia(media) {
    const schema = {
        title: Joi.string().required(),
        url: Joi.string().required(),
        size: Joi.number().required(),
        type: Joi.string().required(),
        filename: Joi.string().required()
    };

    return Joi.validate(media, schema);
}

exports.mediaSchema = mediaSchema;
exports.Media = Media;
exports.validateMedia = validateMedia;