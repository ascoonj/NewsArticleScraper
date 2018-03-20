var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ReviewSchema object
var ReviewSchema = new Schema({
  // `title` is required and of type String
  book_title: {type: String, required: true },
  // `author` is required and of type String
  author: {type: String, required: true },
   // `title` is required and of type String
  review_url: {type: String, required: true, unique: true },
   // `author` is required and of type String
  blurb: {type: String, required: true },
   // `author` is required and of type String
  bookCover: {type: String, required: true },

  // `comment` is an object that stores comment ids
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Reviews with an associated Comment
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {
    timestamps: true
});

// This creates our model from the above schema, using mongoose's model method
var Review = mongoose.model("Review", ReviewSchema);

// Export the Review model
module.exports = Review;
