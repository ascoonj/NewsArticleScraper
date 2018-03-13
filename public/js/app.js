// Javascript to handle to allow user to add a comment on a chosen review
// and to view recent comments related to a particular/selected review

//When the user clicks a review
$(".reviewHolder").on("click", ".reviewCard", function(event){
    const reviewId = this.attr("data-id");
    
    // clear the comments div of current comments
    
    $("#commentsHolder").empty();

    //pass the reviewId to the data-id attribute of the save-comment button
    $("#save-comment").attr("data-id", reviewId);

    // and get comments corresponding to the clicked review
    $.get("/reviews/" + reviewId, function(results, err){
        var comments = results.comments;
        console.log(comments);
            
    });

});

$("save-comment").on("click", function(event){
    event.preventDefault();
    const newComment = {};
    newComment.commenter = $("#commenter").val().trim();
    newComment.body = $("#comment-body").val().trim();
    newComment.review = $(this).attr("data-id");

    $.post("/comment", newComment, function(results){
        console.log(results);
        console.log("successfully added comment to database");

        let html = "<div class = 'card commentCard'>";
        html += "<div class='card-header'>newComment.commenter</div>";
        html += "<div class='card-body'><p>";
        html += newComment.body;
        html += "</p></div></div>";

        $("#commentsHolder").prepend(html);
    });

    $("#commenter").val("");
    $("#comment-body").val("");

});
