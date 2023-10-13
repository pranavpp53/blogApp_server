const mongoose = require('mongoose')

const users = mongoose.model('user', {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const posts = mongoose.model('post', {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    image:{type:String}
});


module.exports = {
    users: users,
    posts: posts
};