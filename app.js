const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
	passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require('./models/campground');
	Comment = require("./models/comment");
	User    = require('./models/user');
	seedDB = require("./seeds");
   
mongoose.connect("mongodb://localhost:27017/keen_kamps", { useNewUrlParser: true });  
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
seedDB(); 

//PASSORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//so currentUser Authentication on every route
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	//route handler
	next();
});

// Campground.create({
//     name: 'Granite Hill', 
//     image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg',
//     description: 'This is a huge granite hill. No bathrooms. No water. Beautiful scenery.'
// },
// (err, campground) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log('NEWLY CREATED CAMPGROUND:');
//         console.log(campground);
//     }
// });


// var campgrounds = [
//         {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
//         {name: 'Granite Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
//         {name: 'Little Popo Aggie', image: 'https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg'},
//         {name: 'Sage Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
//         {name: 'Possom Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
//         {name: 'Little Mine Camp', image: 'https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg'},
//         {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
//         {name: 'Granite Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
//         {name: 'Little Popo Aggie', image: 'https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg'},
//         {name: 'Sage Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
//         {name: 'Possom Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
//         {name: 'Little Mine Camp', image: 'https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg'}
//     ];

app.get('/', (req, res) => {
	// console.log('Is this thing on?');
    res.render('landing');
});

// INDEX route - show all campgrounds
app.get('/campgrounds', (req, res) => {
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
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

//SHOW - shows more info about 1 campground
app.get("/campgrounds/:id", (req, res) => {
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
app.post('/campgrounds', (req, res) => {
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

//========================================
//COMMENTS ROUTES
//========================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
	//find name of campground by id 
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});


app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
	//lookup campground using ID
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		} else {
		//create new coment
			Comment.create(req.body.comment, (err, comment) => {
				if(err){
					console.log(err);
				} else {
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					//redirect to that campground show page
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//===========
//AUTH ROUTES
//===========

//show register form
app.get('/register', (req, res) => {
	res.render('register');
});

//handle sign-up logic
app.post("/register", (req, res) => {
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
app.get("/login", function(req, res){
	res.render("login");
});

//handling login form
app.post("/login", 
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
app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
	   return next();
	   }
	res.redirect("/login");
}

app.listen(3000, () => {
    console.log('KeenKamps');
});

