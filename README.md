# KeenKamp
Camping info site

* Add Landing Pages
* Add Campgrounds Page that lists all campgrounds

Each campground has:
* Name
* Image

[
 {name:"Salmon Creek", image: "http://www.image.com"}
 {name:"Salmon Creek", image: "http://www.image.com"}
 {name:"Salmon Creek", image: "http://www.image.com"}
]

# Layout and basic Styling
* create our header and footer partials
* add in Bootstrap

# Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* setup route to show form
* add basic unstyled form

# Style the campgrounds page
* Add better header/title
* make campgronds display in a gridS

# Style the navbar & form
* add a navbar to all templates
* style the new campground form

# Add Mongoos
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes

# Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

# Refactor Mongoose Code
* create a models directory
* use module.exports
* require everything correctly

RESTFUL ROUTES

name     url      verb          description
================================================
INDEX   /dogs     GET     Display a list of all dogs
NEW  /dogs/new    GET     Displays form to make a new dog
CREATE  /dogs     POST    Add new dog to DB
SHOW /dogs/:id    GET     Shows info about 1 dog


# KeenKamp

> A Node.js web application project spawned from the Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/)

## Live Demo

To see the app in action, go to []()

## Features

* Authentication:
  
  * User login with username and password

  * Admin sign-up with admin code

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users

  * Admin can manage all posts and comments

* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload campground photos

  * Display campground location on Google Maps
  
  * Search existing campgrounds

* Manage user account with basic functionalities:

  * ~~Password reset via email confirmation~~ (disabled)

  * Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Responsive web design

### Custom Enhancements

* Update campground photos when editing campgrounds

* Update personal information on profile page

* Improve image load time on the landing page using Cloudinary

* Use Helmet to strengthen security
 
## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone 
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

### Comments in code

Some comments in the source code are course notes and therefore might not seem necessary from a developer's point of view.

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Google Maps APIs](https://developers.google.com/maps/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [helmet](https://helmetjs.github.io/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [nodemailer](https://nodemailer.com/about/)
* [moment](https://momentjs.com/)
* [cloudinary](https://cloudinary.com/)
* [geocoder](https://github.com/wyattdanger/geocoder#geocoder)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Cloudinary](https://cloudinary.com/)
* [Heroku](https://www.heroku.com/)
* [Cloud9](https://aws.amazon.com/cloud9/?origin=c9io)
## License

#### [MIT](./LICENSE)
