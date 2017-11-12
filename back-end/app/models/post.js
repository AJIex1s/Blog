var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var PostSchema = new mongoose.Schema({
    id: { type: Number, index: true, auto: true, unique: true },
    title: { type: String, maxlength: 255 },
    content: { type: String, maxlength: 1000 },
    createDate: { type: Date },
    updateDate: { type: Date },
    deleteDate: { type: Date },
    deleted: { type: Boolean }
});

PostSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createDate = Date.now();
        this.deleted = false;
    }
    this.updateDate = Date.now();
    next();
});

mongoose.model('Post', PostSchema);