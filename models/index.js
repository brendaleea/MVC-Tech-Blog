const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define relationships
User.hasMany(Post, {
    foreignKey: 'author_id'
});

Post.belongsTo(User, {
    foreignKey: 'author_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});



module.exports = { User, Post, Comment }
