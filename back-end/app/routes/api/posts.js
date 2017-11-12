var router = require('express').Router();
var posts = require('../../static-data');

router.route('/')
    .get((req, res) => { return res.json(posts); })
    .post((req, res) => { return res.json(posts); });


module.exports = router;