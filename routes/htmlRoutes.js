var path = require("path");
var db = require("../models");

module.exports = function(app) {

    // app.get("/", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/test.html"));
    // });


    app.get("/", function(req, res) {
        db.Review.find().sort({_id:-1}).limit(12).populate('comments').exec(function(err,data){
			if (err){
				return console.error(err);
			}
            res.render("index", {data:data});
            console.log(data);
        });
    });

    // app.get("/articles", function(req, res) {
    //     // Grab every document in the Articles collection
    //     db.Article.find({})
    //       .then(function(dbArticle) {
    //         // If we were able to successfully find Articles, send them back to the client
    //         res.json(dbArticle);
    //       })
    //       .catch(function(err) {
    //         // If an error occurred, send it to the client
    //         res.json(err);
    //       });
    //   });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/reviews/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Review.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("comment")
        .then(function(dbReview) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbReview);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });

    app.get("/comments/:reviewId", function(req, res) {
        db.Comment.find({review: req.params.reviewId})
        .then(function(results){
            res.render("index", {results:results});
        })
        .catch(function(err){
            res.json(err);
        });
    });
    
  // Route for saving/updating an Article's associated Note
    // app.post("/reviews/:id", function(req, res) {
    //     // Create a new note and pass the req.body to the entry
    //     db.Comment.create(req.body)
    //     .then(function(dbComment) {
    //         // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
    //         // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    //         // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    //         return db.Review.findOneAndUpdate({ _id: req.params.id }, {$push: {comments: dbComment._id}}, { new: true });
    //     })
    //     .then(function(dbReview) {
    //         // If we were able to successfully update an Article, send it back to the client
    //         res.json(dbReview);
    //     })
    //     .catch(function(err) {
    //         // If an error occurred, send it to the client
    //         res.json(err);
    //     });
    // });




    app.post("/comment", function(req, res){
        var newComment = new db.Comment(req.body);
        console.log("New comment: ", newComment);
        console.log("req.body: ", req.body)
        db.Comment.create(newComment)
        .then(function(dbComment) {
            return db.Review.findOneAndUpdate(
                {_id: newComment.review},
                {$push: {comment: dbComment._id}},
                {new: true});
            })
            .then(function(dbReview){
                res.json(dbReview);
            })
            .catch(function(err){
                    
                    res.json(err);
            }
        );
    });

}