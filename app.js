//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent01 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet nisl suscipit adipiscing bibendum. Elementum nisi quis eleifend quam adipiscing. Vitae semper quis lectus nulla at volutpat. Et tortor consequat id porta nibh. Congue eu consequat ac felis donec et odio pellentesque diam. Condimentum lacinia quis vel eros donec. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. At varius vel pharetra vel turpis nunc eget. Mollis aliquam ut porttitor leo a diam sollicitudin tempor.Proin nibh nisl condimentum id. Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Netus et malesuada fames ac turpis egestas maecenas. Eget arcu dictum varius duis at consectetur. Sit amet aliquam id diam maecenas ultricies mi. Mauris nunc congue nisi vitae suscipit tellus mauris. Quam nulla porttitor massa id neque aliquam vestibulum. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Orci phasellus egestas tellus rutrum tellus pellentesque. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Posuere ac ut consequat semper viverra nam libero justo.Nisl nisi scelerisque eu ultrices vitae auctor eu augue. Pretium viverra suspendisse potenti nullam ac tortor vitae. Convallis aenean et tortor at risus viverra adipiscing at. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Sit amet commodo nulla facilisi. Dictumst quisque sagittis purus sit amet volutpat consequat mauris.";
const aboutContent02 ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed. Dolor sit amet consectetur adipiscing elit. Eu scelerisque felis imperdiet proin. Vitae sapien pellentesque habitant morbi. Pellentesque id nibh tortor id aliquet. Mauris ultrices eros in cursus turpis. Vel risus commodo viverra maecenas accumsan lacus. Rutrum quisque non tellus orci ac auctor augue mauris. Lectus urna duis convallis convallis.Urna cursus eget nunc scelerisque viverra. Lacus sed turpis tincidunt id aliquet risus feugiat in ante. Donec massa sapien faucibus et. Quis hendrerit dolor magna eget est. Eu sem integer vitae justo. Pellentesque elit eget gravida cum sociis. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Diam quis enim lobortis scelerisque fermentum dui faucibus. Tellus rutrum tellus pellentesque eu tincidunt tortor. Elit at imperdiet dui accumsan sit amet. Et tortor consequat id porta. A cras semper auctor neque vitae tempus quam. Eget mauris pharetra et ultrices neque ornare aenean euismod elementum. Vitae congue eu consequat ac felis donec. Purus viverra accumsan in nisl nisi. Duis ut diam quam nulla porttitor massa id neque."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var db = mongoose.connect('mongodb://127.0.0.1:27017/roster');

// testing connectivity
mongoose.connection.once('connected', function() {
	console.log("Database connected successfully")
});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent01: aboutContent01,aboutContent02: aboutContent02});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});