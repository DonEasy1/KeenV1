var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    var campgrounds = [
        {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
        {name: 'Granite Hill', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg'},
        {name: 'Little Popo Aggie', image: 'https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg'}
    ];
    res.render('campgrounds',{campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('KeenKamp');
});