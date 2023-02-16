//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const nodemailer=require('nodemailer');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent01 = "A blog website is a site that is updated with new information on an ongoing basis. It normally consists of a collection of posts. Posts may be short, informal, controversial, or more professional. There are a couple of things that set a blog apart from a traditional website. The first is that blogs are updated consistently. Whether a brand updates their blog daily, weekly, or monthly, they will be putting new content up on the blog regularly for readers to engage with. With a traditional site, you may still find yourself updating content from time to time. But, for the most part, the content remains the same for longer periods of time.";
const aboutContent02 ="The other main difference between a blog and a traditional website is that blog content encourages engagement. While a traditional website page provides information for the visitor and encourages them to take a specific action. Blog content provides the option for readers to comment and ask questions on individual posts. That means that visitors are engaging with your blog posts in a different way than they are your main site pages. Now that you know the answer to the question – what is a blog website – it’s time to talk about how a blog can help you grow your business. One of the greatest benefits of blogging is that it helps you connect and build relationships with leads and customers. Your blog is a great place to provide content that adds value for readers and helps them better understand how to solve their greatest challenges. By consistently publishing engaging and thoughtful content on your blog. You are working to show leads and customers that your brand has something to offer. Also through your blog, you can develop your own community. Imagine getting comments through your blog post comment section from your audience then exchanging thoughts and ideas with them."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const DB="mongodb+srv://manju:manju123@cluster0.oisoeb9.mongodb.net/BloggingWebsite?retryWrites=true&w=majority"

mongoose.set("strictQuery", false);
mongoose.connect(DB).then(()=>{
    console.log("Database successfully connected")
}).catch((err)=>{
    console.log(err);
})
// var db = mongoose.connect('mongodb://127.0.0.1:27017/roster');

// // testing connectivity
// mongoose.connection.once('connected', function() {
// 	console.log("Database connected successfully")
// });

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
  const title=req.body.postTitle;
  const content=req.body.postBody;
  const post = new Post({title,content});

  post.save(function(err){
    if(!err){
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