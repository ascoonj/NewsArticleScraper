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
            // console.log(data);
        });
    });

    

    // Route for grabbing a specific Review by id, and populating it with it's comment
    app.get("/reviews/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Review.findOne({ _id: req.params.id })
        // ..and populate all of the comments associated with it
        .populate("comment")
        .then(function(dbReview) {
            // If we were able to successfully find an Review with the given id, send it back to the client
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

   
    // app.post("/comment", function(req, res){
    //     // var newComment = new db.Comment(req.body);
    //     // console.log("New comment: ", newComment);
    //     // console.log("req.body: ", req.body)
    //     db.Comment.create(newComment)
    //     .then(function(dbComment) {
    //         db.Review.findOneAndUpdate(
    //             {_id: newComment.review},
    //             {$push: {comment: dbComment._id}},
    //             {new: true});
    //             console.log("sthg happening here");
    //         })
    //         .then(function(dbComment){
    //             res.json(dbComment);
    //             console.log("most recently added comment ", dbComment);
    //         })
    //         .catch(function(err){
                    
    //                 res.json(err);
    //         }
    //     );
    // });


    app.post("/comment", function(req, res){
        console.log("this line is running ", req.body);
        db.Comment.create(req.body)
			.then(function(dbComment) {
            	db.Review.findOneAndUpdate(
					{_id: req.body.review },
					{$push: {comment: dbComment._id}},
					{new: true}
				).then(function(dbReview){
                    console.log("most recently added comment ", dbComment);
                    console.log(dbReview);
                    res.json(dbComment);
            	}).catch(function(err){
                    res.json(err);
            	});
		});
    });
    

    app.post("/deleteComment/:id", function(req, res) {
        console.log(req.params.id);
        
        db.Comment.findByIdAndRemove({_id: req.params.id}, function(error) {
            if (error) console.log('Comment could not be deleted', error);
            res.send();
        });
    });

}