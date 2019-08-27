var express = require("express");
var router = express.Router({mergeParams: true});
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
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE ROUTE - add a new campground to DB
router.post("/", isLoggedIn, (req, res) => {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
	var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
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
router.get("/new", isLoggedIn, (req, res) => {
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
// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, (req, res) => {
	//find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
	//redirect to campgrounds page
			res.redirect("/campgrounds");
		} else {
		//redirect to show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})

// DESTROY CAMPGROUND ROUTE

router.delete("/:id", checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) =>{
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
	   return next();
	   }
	res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err, foundCampground) => {
			if(err){
				res.redirect("back");
			} else {
				//does user own the campground?
				if(foundCampground.author.id.equals(req.user._id)){	
					next();
				} else {
					res.redirect("back");
				}
			}
		});
		
	//if not, redirect
	} else {
		res.redirect("back");
	}
}
module.exports = router;
