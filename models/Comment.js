var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
  // `comment` is of type String
  commenter: String,
  // `body` is of type String
  body: String,

  review: {type: Schema.Types.ObjectId, ref: "Review"}

}, {
  timestamps: true
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;