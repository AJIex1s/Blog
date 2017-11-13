let router = require('express').Router();
let mongoose = require('mongoose');
let posts = require('../../static-data');
var Post = mongoose.model('Post');

Post.findAliveById = function (id) {
    return Post.findOne({ "id": id, deleted: false });
}

router.param('id', async (req, res, next, id) => {
    let post = await Post.findAliveById(id);
    if (!post)
        return res.sendStatus(404);
    return next();
});

router.route('/')
    .get((req, res) => {
        return Post.find().then(posts => res.json(posts));
    })
    .post(async (req, res) => {
        if (!req.body || !req.body.post)
            return res.sendStatus(400);

        let posts = await Post.find();
        let postId = 0;
        let post = null;

        if (posts.length > 0)
            postId = posts[posts.length - 1].id + 1;

        post = new Post(req.body.post);
        post.id = postId;

        return post.save().then(() => res.json(post));
    });

router.route('/:id')
    .get(async (req, res, next) => {
        let post = await Post.findAliveById(req.params.id);
        return res.json(post);
    })
    .put(async (req, res, next) => {
        if (!req.body || !req.body.post)
            return res.sendStatus(400);

        let post = await Post.findAliveById(req.params.id);

        console.log(req.body.post.title);
        if (typeof req.body.post.title !== 'undefined')
            post.title = req.body.post.title;
        if (typeof req.body.post.content !== 'undefined')
            post.content = req.body.post.content;


        return post.save().then(() => res.json(post));
    })
    .delete(async (req, res) => {
        let post = await Post.findOne({ "id": req.params['id'], delete: false });
        post.deleted = true;
        post.deleteDate = Date.now();
        return res.json(post);
    });

module.exports = router;