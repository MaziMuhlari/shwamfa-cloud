const { Media, validateMedia } = require('../models/media');
const auth = require('../middleware/authentication');
const express = require('express');
const config = require('config');

const fileStackApiKey = config.get('fileStackApiKey');
const filestack = require('filestack-js').init(fileStackApiKey);

var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'content/'); },
    filename: function (req, file, cb) { cb(null, file.originalname); }
});

var upload = multer({ storage: storage });
const router = express.Router();

const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

/**
 * @api {post} /api/media
 * @apiName CreateMedia
 * @apiGroup Media
 * 
 * @apiDescription Publish a news media.
 */
router.post('/', [auth, upload.single('file')], async (req, res) => {

    const file = req.file;
    const filepath = file.path;
    const friendly = req.body.title;
    const type = req.body.type;

    filestack.upload(filepath)
        .then(async ok => {

            const obj = { title: friendly, type: type, url: ok.url, size: ok.size, mimetype: ok.mimetype, filename: ok.filename };

            const { error } = validateMedia(obj);
            if (error) return res.status(400).send(error.details[0].message);

            let media = new Media(obj);
            await media.save();

            await unlinkAsync(filepath);

            res.send(media);

        })
        .catch(async failure => {
            await unlinkAsync(filepath);
            res.send(null);
        });

});

/**
 * @api {get} /api/media/1
 * @apiName GetMediaById
 * @apiGroup Media
 * 
 * @apiDescription Get a published media by Id.
 */
router.get('/:mediaId', auth, async (req, res) => {

    const media = await Media.findById(req.params.mediaId);
    res.send(media);

});

/**
 * @api {get} /api/media
 * @apiName GetMedia
 * @apiGroup Media
 * 
 * @apiDescription Get all published media.
 */
router.get('/', auth, async (req, res) => {

    const media = await Media.find({}, {}, { sort: { 'created_at': -1 } });
    res.send(media);

});

/**
 * @api {delete} /api/media/1
 * @apiName DeleteMediaById
 * @apiGroup Media
 * 
 * @apiDescription Delete media by Id.
 */
router.delete('/:id', auth, async (req, res) => {

    const media = await Media.findByIdAndDelete(req.params.id);
    res.send(media);

});

module.exports = router;