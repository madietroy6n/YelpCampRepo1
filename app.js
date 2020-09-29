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

Campground.create(
	{
		name:"Clear Lake", 
	 	image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"
		}, function(err, campground){
			if(err){
				console.log(err);
			} else {
				console.log("Newly Created Campground: ");
				console.log(campground);
			}
		});

var campgrounds = [
		{name:"Clear Lake", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Little Stoney",image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Bear Mountain", image:"https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Billy Goat Hill", image:"https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Clear Lake", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Little Stoney",image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Bear Mountain", image:"https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Billy Goat Hill", image:"https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Clear Lake", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Little Stoney",image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Bear Mountain", image:"https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Billy Goat Hill", image:"https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&h=350"}
	 ];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	 res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
	
// 	get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampGround = {name: name, image: image}
	campgrounds.push(newCampGround);
// 	redirect back to campgrounds page
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
})

app.listen(process.env.PORT || 8080, function() {
  console.log("YelpCamp Server Running");
});