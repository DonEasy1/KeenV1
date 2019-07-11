var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");

// INDEX route - show all campgrounds
router.get('/', (req, res) => {
	// console.log(req.user);
    // all campgrounds from db
    Campground.find({}, (err, allcampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index',{campgrounds: allcampgrounds});
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

//CREATE ROUTE - add a new campground to DB
router.post('/', (req, res) => {
    //get data from form and add to campgrounds array
    var newCampground = {name: name, image: image, description: desc};
    // create new campground and save to db
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            //send user back to the form and say something re what was entered
            console.log(err);
        } else {
			res.redirect("/campgrounds");
		}
    });
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
	   return next();
	   }
	res.redirect("/login");
}

module.exports = router;
