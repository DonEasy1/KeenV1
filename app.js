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
   
//requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	authRoutes = require("./routes/index");
	
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

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, () => {
    console.log('KeenKamps');
});

