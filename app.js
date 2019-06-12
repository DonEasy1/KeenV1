/* global name */
/* global image */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var campgrounds = [
        {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
        {name: 'Granite Hill', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg'},
        {name: 'Little Popo Aggie', image: 'https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg'}
    ];
    
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds',{campgrounds: campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs')
});

app.post('/campgrounds', (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    //get data from form and add to campgrounds array
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //recirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('KeenKamp');
});
