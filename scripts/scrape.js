const express = require("express");
const app = express();


// Parses our HTML and helps us find elements
// Fast, flexible & lean implementation of core jQuery designed specifically for the server.
const cheerio = require("cheerio");

// Promise based HTTP client for the browser and node.js
const axios = require("axios");

const db = require("../models");




module.exports = function(app) {

app.get("/scrape", function (req, res) { 
// Create a variable to store the url we will be scraping
const url = `https://www.kirkusreviews.com/book-reviews/fiction-books-literature/`;

// Use axios to get the html from the above link
axios
    .get(url)
    // Our promise-based response
    .then((response) => {
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        let result = {};

        $("div.book-item-ctr").each(function (i, element) {

            var link_suffix = $(element).find("a").first().attr("itemprop", "url").attr("href");

            result.book_title = $(element).find("span").first().attr("itemprop", "name").text();
            result.author = $(element).find("div.book-item-author").children().first().text();
            result.blurb = $(element).find("div.book-item-review-last").text().trim();
            result.bookCover = $(element).find("img").attr("itemprop", "image").attr("src");
            result.review_url = `https://www.kirkusreviews.com${link_suffix}`;
            console.log(result.link);

            // Save these results in an object that we'll push into the results array we defined earlier
            // results.push({
            //     bookName: bookName,
            //     author: author,
            //     link: link,
            //     blurb: blurb,
            //     bookCover: bookCover
            // });

            db.Review.create(result)
                .then(function(dbReview) {
                    console.log(dbReview);
                })
                .catch(function(err) {
                    //return res.json(err);
                    console.log(err);
                });
        });
        res.send("scrape complete")
        console.log(result);
    });
    
});
};