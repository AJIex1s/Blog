var app = require('./app');
var port = process.env.PORT || 3012;

var server = app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

function test(callback) {
    test1("a", function (err, a_response) {

        if (err) return callback(err);

        test2(a_response, function (err, b_response) {
            if (err) return callback(err);
            callback(null, b_response);
        });

    });
}

function test(callback) {
    return new Promise((res, rej) => {
        test1("a").then(a_response => test2(a_response))
            .then(b_response => callback(null, b_response))
            .catch(err => callback(err));
    });
}