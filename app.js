//jshint esversion:6

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");


mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title for your article"]
  },

  content: String
});
const Article = mongoose.model("Article", articleSchema);


//CHAINED ROUTE HANDLERs USING EXPRESS

app.route("/articles")

  .get(function (req, res) {
    Article.find(function (err, articles) {
      if (!err) res.send(articles);
      else res.send(err);
    });
  })
  
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function (err) {
      if (!err) res.send("Successfully added a new article!");
      else res.send(err);
    });
  })
  
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) res.send("Successfully deleted all articles!");
      else res.send(err);
    });
  });




// REQUEST SPECIFIC ARTICLES METHOD

app.route("/articles/:articleTitle")

  .get(function(req, res){

    Article.findOne({title: req.params.articleTitle}, function ( err, foundArticle ){
      if(!err){
        if(foundArticle) res.send(foundArticle);
        else res.send("No articles matching that title was found");
      }
      else res.send(err);
    });

  })
  
  .put(function (req, res){

    console.log(req.body.title + "\n" + req.body.content);
    Article.update(
      {title: req.params.articleTitle}, 
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      function (err){
        if(!err) res.send("Successfully Updated that article");
        else res.send(err);
      });

  });





let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully");
});