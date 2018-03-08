module.exports = function(){
	const router = require("express").Router();

	router.get("/api/reviews",function(req,res){
		//find all reviews
	});

	router.get("/api/reviews/:id",function(req,res){
		//find one product with matching id
		const id = req.params.id;


	});

	router.put("/api/reviews",function(req,res){
		//update product
		const myProduct = req.body;
	});

	router.post("/api/reviews",function(req,res){
		//create new product
		const myProduct = req.body;
		console.log(req.body);


		res.json(req.body);
	});

	router.delete("/api/reviews",function(req,res){
		//delete product
		const myProduct = req.body;
	});


	return router;
}
