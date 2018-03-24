// Javascript to handle to allow user to add a comment on a chosen review
// and to view recent comments related to a particular/selected review

//When the user clicks a review
$(".reviewHolder").on("click", ".add-comment", function(event){
    const reviewId = $(this).attr("data-id");
    console.log("an 'add comment' button was clicked");
    console.log(reviewId);

    $("#comment-form").removeClass("hidden");
    
    $("#commentsHolder").empty();

    $("#save-comment").attr("data-id", reviewId);
   console.log("comment button "+ $("#save-comment").attr("data-id"));

    //and get comments corresponding to the clicked review
    $.get("/reviews/" + reviewId, function(results, err){
        console.log(results);
        var name = results.book_title;
        $("#bookName").text(name);
        var comment = results.comment;
        console.log(comment);
        comment.forEach(function(element){
            let html = "<div class = 'card commentCard'>";
            html += "<div class='card-header'>";
            html += element.commenter;
            html += "</div><div class='card-body'><p>";
            html += element.body;
            html += "</p>";
            html += "<button data-id =" + element._id;
            html += " type='submit' class='btn btn-danger btn-sm delete-comment'>";
            html += "Delete</button></div></div>";

            $("#commentsHolder").prepend(html);
        });
            
    });

});


$("#save-comment").on("click", function(event){
    event.preventDefault();
    var newComment = {};
    newComment.commenter = $("#commenter").val().trim();
    newComment.body = $("#comment-body").val();
    newComment.review = $(this).attr("data-id");
    console.log("comment being added: ", newComment);

    $.post("/comment", newComment, function(results){
        console.log("results: ", results);
        //console.log("successfully added comment to database");

        let html = "<div class = 'card commentCard'>";
        html += "<div class='card-header'>";
        html += newComment.commenter;
        html += "</div><div class='card-body'><p>";
        html += newComment.body;
        html += "</p><button data-id =" + results._id;
        html += " type='submit' class='btn btn-danger btn-sm delete-comment'>";
        html += "Delete</button></div></div>";

        $("#commentsHolder").prepend(html);
        // $("#commentsHolder").removeClass("hidden");
    });

    $("#commenter").val("");
    $("#comment-body").val("");

});

$("#commentsHolder").on("click", ".delete-comment", function(event){
    event.preventDefault();
    var commentId = $(this).attr("data-id");
    console.log("the comment's id is: ", commentId);
    $.post("/deleteComment/" + commentId, function(results) {
        console.log("comment deleted");
        
    });
    $(this).parent().parent().hide();

});