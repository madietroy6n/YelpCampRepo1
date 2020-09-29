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
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{	
// 		name:"Little Stoney",
// 		image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
// 		description:"This is a place with lots of waterfalls"
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

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
// 	 Get all campgrounds from the db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
	
});


// CREATE - add a new campground to DB
app.post("/campgrounds", function(req,res){
	
// 	get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampGround = {name: name, image: image, description: desc}
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

// NEW - show form to create a new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
});


// SHOW - Shows info about one campground
app.get("/campgrounds/:id", function(req, res){
// 	find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			// 	render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	}); 
	

})

app.listen(process.env.PORT || 8080, function() {
  console.log("YelpCamp Server Running");
});