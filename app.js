const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground');
	Comment = require("./models/comment");
	seedDB = require("./seeds");
   
mongoose.connect("mongodb://localhost:27017/keen_kamps", { useNewUrlParser: true });  
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB(); 

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
       //render show template with that campground
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

app.get("/campgrounds/:id/comments/new", (req, res) => {
	//find name of campground by id 
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.listen(3000, () => {
    console.log('KeenKamps');
});

app.post('/campgrounds/:id/comments', (req, res) => {
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