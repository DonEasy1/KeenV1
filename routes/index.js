var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// var middleware = require("../middleware");

//root route
router.get('/', (req, res) => {
	// console.log('Is this thing on?');
    res.render('landing');
});

//show register form
router.get('/register', (req, res) => {
	res.render('register');
});

//handle sign-up logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => { 
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
           res.redirect("/campgrounds"); 
        });
    });
});
	
//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handling login form
router.post("/login", 
		 //passport middleware
	passport.authenticate
		("local", {
	 	successRedirect: "/campgrounds",
		failureRedirect: "/login",
	 }), 
		 // this does nothing
		 (req, res) => {
	 	// res.send('LOGIN');
});

// logout route
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/campgrounds");
});

module.exports = router;
