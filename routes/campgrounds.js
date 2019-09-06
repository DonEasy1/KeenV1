var express = require("express");
var router = express.Router({mergeParams: true});
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX route - show all campgrounds
router.get("/", (req, res) => {
	// console.log(req.user);
    // all campgrounds from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE ROUTE - add a new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    //get data from form and add to campgrounds array
    var name = req.body.name;
	var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
	var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
		// console.log(req.body.name);
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground must be before SHOW Page (/:id)
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

//SHOW - shows more info about 1 campground
router.get("/:id", (req, res) => {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err || !foundCampground){
			console.log("err");
			req.flash("error", "Campground not found.");
			return res.redirect("/campgrounds");
		}
		console.log(foundCampground);
       //render show template with that campground and always checking for currentUser logged in/auth with app.use
        res.render("campgrounds/show", {campground: foundCampground}); 
    });
});

//EDIT: show edit form for campground
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, (req, res) => {
	//find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			req.flash("error", "Edit failed.")
			res.redirect("/campgrounds");
		} else {
		//redirect to show page
			req.flash("success", "Campground edited successfully.")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})

// DESTROY CAMPGROUND ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) =>{
		if(err){
			req.flash("error", "Delete action NOT completed.")
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground successfully deleted.")
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
