var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


// INDEX route - show all campgrounds
router.get("/", (req, res) => {
	// console.log(req.user);
    // all campgrounds from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE ROUTE - add a new campground to DB
router.post('/', (req, res) => {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground must be before SHOW Page (/:id)
router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

//SHOW - shows more info about 1 campground
router.get("/:id", (req, res) => {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
			console.log(foundCampground);
       //render show template with that campground and always checking for currentUser logged in/auth with app.use
        res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
});

module.exports = router;
