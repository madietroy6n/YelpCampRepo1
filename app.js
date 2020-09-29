var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser")
    

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{	
// 		name:"Little Stoney",
// 		image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
// 		}, function(err, campground){
// 			if(err){
// 				console.log(err);
// 			} else {
// 				console.log("Newly Created Campground: ");
// 				console.log(campground);
// 			}
// 		});


app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
// 	 Get all campgrounds from the db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds",{campgrounds:allCampgrounds});
		}
	});
	
});

app.post("/campgrounds", function(req,res){
	
// 	get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampGround = {name: name, image: image}
// 	Create a new campground and save to the database
	Campground.create(newCampGround, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
// 			redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
});

app.listen(process.env.PORT || 8080, function() {
  console.log("YelpCamp Server Running");
});