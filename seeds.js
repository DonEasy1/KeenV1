var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://cdn.pixabay.com/photo/2017/08/17/08/08/camp-2650359__340.jpg",
        description: "blah blah...Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
		author: 
			{id: "5d2aa2f3e8b614229ed89702",
			username: "Harry"
		}
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "hah hah...Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web 		designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of 				Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
		author: 
			{id: "5d5ef563445fbb024a184a8f",
			username: "Freddy"
		}
    },
    {
        name: "Canyon Floor", 
        image: "https://cdn.pixabay.com/photo/2016/11/23/17/05/campfire-1853835__340.jpg",
        description: "rah rah...Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web 		designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of 				Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
		author: 
			{id: "5d5de49cb30178050a2ed1e3",
			username: "Candy"
		}
    },
];
 
function seedDB(){
   // Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {text: "HOMER: This place is great, but I wish there was internet.",
                            	// author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        });
    }); 
}
 
module.exports = seedDB;