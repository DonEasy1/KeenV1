var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Comment = require("../models/campground");
// var middleware = require("../middleware");

//root route
router.get('/', (req, res) => {
	// console.log('Is this thing on?');
    res.render('landing');
});

// show register form
router.get("/register", (req, res) => {
   res.render("register", {page: 'register'}); 
});

// handle sign-up logic
router.post("/register", (req, res) => {
    var newUser = new User({
		username: req.body.username, 
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		avatar: req.body.avatar
		});
	if(req.body.adminCode == 'AnEasyGuess'){
		newUser.isAdmin = true;
	}    
	User.register(newUser, req.body.password, (err, user) => { 
	if(err){
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () => {
				req.flash("success", "Welcome to Keen Kamps, " + user.username + "!");
		res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", (req, res) => {
   res.render("login", {page: 'login'}); 
});

//handling login form
router.post("/login", 
	//passport middleware
	passport.authenticate
		("local", {
	 	successRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash: true,
	 	}), 
		 // this does nothing
		 (req, res) => {
	 	// res.send('LOGIN');
});

// logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "LOGGED OUT!")
	res.redirect("/campgrounds");
});

//USER PROFILES
router.get("/users/:id", (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if(err){
			req.flash("error", "Something went wrong.");
			req.redirect("/");
		}
		Campground.find().where('author.id').equals(foundUser._id).exec((err, campgrounds, comments) => {
			if(err){
				req.flash("error", "Something went wrong.");
				req.redirect("/");
			}	
			res.render("users/show", {user: foundUser, campgrounds: campgrounds, comments: comments});
		});
	});
});

module.exports = router;
