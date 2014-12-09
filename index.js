var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var db = require("./models/index.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res) {
	res.render("index");
})


app.get("/results", function(req, res) {
	var searchTerm = req.query.title;

	request("http://www.omdbapi.com/?s=" + searchTerm, function(error, response, body) {
		if(error) {throw error};
		if(!error && response.statusCode == 200) {
			var content = JSON.parse(body);
			res.render("results", {"search":content.Search || []});
		}
	})	
})


app.get("/movies/:imdb", function(req, res) {
	var imdbNum = req.params.imdb;

	request("http://www.omdbapi.com/?i=" + imdbNum + "&tomatoes=true&", function(error, response, body) {
		if(error) {throw error};
		if(!error && response.statusCode == 200) {
			// console.log("---------------------" + body);
			var objData = JSON.parse(body);
			// res.send(objData);
			res.render("movies", {
				"title": objData.Title,
				"year": objData.Year,
				"genre": objData.Genre,
				"actors": objData.Actors,
				"tomatoPts": objData.tomatoRating,
				"poster": objData.Poster,
				"imdb": imdbNum
			})
		}
	})
})


app.post("/added", function(req, res) {
	// res.send(req.body);
	// console.log(req.body);

	// db.watch_list.create(req.body).done(function(err, data) {
	// 		if(err) throw err;
	// 	res.render("added");

	db.watch_list.findOrCreate({where: req.body}).spread(function(data, wasMade) {
		res.send({"data": data,"created": wasMade});

		// res.redirect("/added?=added=" +wasMade);
	// .catch grabs the error	
	}).catch(function(err) {
		if(err) {throw err};
	})
})


app.get("/added", function(req, res) {

	// db finds all instances of the ID by ascending order.
	db.watch_list.findAll({order: "id ASC"}).then(function(data) {
	// res.send(data);
		res.render("added", {"allData":data});
	// .catch grabs the error
	}).catch(function(err) {
		if(err) {throw err}
	})
})


app.delete("/added/:id", function(req, res) {
	// console.log(req.params.id)
	db.watch_list.destroy({where: {"id":req.params.id}}).then(function(data){
		res.send({"delete": data});
	})
})


app.listen(3000);