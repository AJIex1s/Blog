let router = require('express').Router();
let mongoose = require('mongoose');
let posts = require('../../static-data');
var Post = mongoose.model('Post');

router.param('id', (req, res, next, id) => {
    if (!posts.find((post) => post.id == id))
        return res.sendStatus(404);
    return next();
});

router.route('/')
    .get((req, res) => {
        Post.find().then(posts => res.json(posts));
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

        return post.save().then(function () {
            console.log(post.updateDate);
            return res.json(post);
        });

    });

router.route('/:id')
    .get((req, res, next) => {
        let post = posts.find(post => post.id == req.params['id']);
        return res.json(post);
    })
    .put((req, res, next) => {
        let post = posts.find(post => post.id == req.params['id']);
        return res.json(post);
    });

module.exports = router;